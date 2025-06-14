import { NextResponse } from 'next/server';
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { config } from 'dotenv';
config();
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { supabase } from '@/lib/supabase/client';

export const maxDuration = 300;

export async function POST(request: Request) {
  let { url, urls = [], bringYourOwnFirecrawlApiKey } = await request.json();
  let firecrawlApiKey: string | undefined;
  let limit: number = 100;
  let no_limit: boolean = false;
  let github: boolean = false;
  let maxTokens: number = 1000;

  if (urls.length === 0 && url) {
    urls = [url];
  }

  if (bringYourOwnFirecrawlApiKey) {
    firecrawlApiKey = bringYourOwnFirecrawlApiKey;
    console.log("Using provided Firecrawl API key. Limit set to 100");
    no_limit = true;
    maxTokens = 10000;
  } else {
    firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
    limit = 10;
    console.log("Using default limit of 10");
  }

  if (!firecrawlApiKey) {
    throw new Error('FIRECRAWL_API_KEY is not set');
  }

  const app = new FirecrawlApp({ apiKey: firecrawlApiKey });

  let urlsToScrape = urls;

  //make sure url length is less than or equal to limit
  if (urlsToScrape && urlsToScrape.length > limit) {
    urlsToScrape = urlsToScrape.slice(0, limit);
  }
  const sampleUrl = urlsToScrape[0];
  let urlObj;
  if (sampleUrl?.startsWith('http://') || sampleUrl?.startsWith('https://')) {
    urlObj = new URL(sampleUrl);
  } else if (sampleUrl?.startsWith('http:/') || sampleUrl?.startsWith('https:/')) {
    urlObj = new URL(sampleUrl);
  } else {
    urlObj = new URL(`http://${sampleUrl}`);
  }

  const stemUrl = `${urlObj.hostname}`;


  let llmstxt = `# ${url} llms.txt\n\n`;
  let llmsFulltxt = `# ${url} llms-full.txt\n\n`;

  // Batch scrape the website

  if (!urls) {
    throw new Error('URLs are not defined');
  }

  if (stemUrl.includes('github.com')) {
    const pathSegments = urlObj.pathname.split('/').filter(segment => segment);
    if (pathSegments.length >= 2) {
      github = true;
      const owner = pathSegments[0];
      const repo = pathSegments[1];
      const githubUrl = `https://uithub.com/${owner}/${repo}?maxTokens=${maxTokens}&accept=text/markdown`;
      const response = await fetch(githubUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/markdown'
        }
      });

      if (response.ok) {
        const githubContent = await response.text();
        llmstxt += githubContent.split('/')[0];
        llmsFulltxt += githubContent;
      } else {
        throw new Error(`Failed to fetch GitHub content: ${response.statusText}`);
      }
    }
  } else {
    console.log("urls", urls);
    // Scrape multiple websites (synchronous):
    const batchScrapeResult = await app.batchScrapeUrls(urls, {
      formats: ['markdown'],
      onlyMainContent: true,
    });

    if (!batchScrapeResult.success) {
      throw new Error(`Failed to scrape: ${batchScrapeResult.error}`);
    }
    for (const result of batchScrapeResult.data) {
      const metadata = result.metadata;
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL
      });

      const DescriptionSchema = z.object({
        description: z.string(),
        title: z.string(),
      });

      const completion = await openai.beta.chat.completions.parse({
        // process.env.MODEL || 
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate a 9-10 word description and a 3-4 word title of the entire page based on ALL the content one will find on the page for this url: ${metadata?.url}. This will help in a user finding the page for its intended purpose. Here is the content: ${result.markdown}`,
          }
        ],
        response_format: zodResponseFormat(DescriptionSchema, "description"),
      });

      const parsedResponse = completion.choices[0].message.parsed;
      const description = parsedResponse!.description;
      const title = parsedResponse!.title;

      llmstxt = llmstxt + `- [${title}](${metadata?.url}): ${description}\n`;
      llmsFulltxt = llmsFulltxt + result.markdown;

    }
  }


  // if (!bringYourOwnFirecrawlApiKey) {
  //   llmstxt = `*Note: This is an incomplete result, please enable full generation by entering a Firecrawl key.\n\n` + llmstxt
  //   llmsFulltxt = llmsFulltxt
  // }

  const { data, error } = await supabase
    .from('LLMstxt')
    .insert([
      { url: url, llmstxt: llmstxt, llmsfulltxt: llmsFulltxt, no_limit: no_limit }
    ]);

  if (error) {
    throw new Error(`Failed to insert into Supabase: ${error.message}`);
  }

  return NextResponse.json({ llmstxt: llmstxt, llmsFulltxt: llmsFulltxt });
}
