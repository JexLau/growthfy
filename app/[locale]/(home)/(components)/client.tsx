"use client";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

export function HomePageClient({ locale }: { locale: string }) {
  const t = useTranslations();
  const homeT = useTranslations('home');
  const commonT = useTranslations('common');
  
  const [firecrawlKey, setFirecrawlKey] = React.useState("");
  const hasKey = firecrawlKey.length > 0;
  const [loading, setLoading] = useState<boolean>(false);
  const [mapUrls, setMapUrls] = useState<string[]>([]);
  const [scrapingStatus, setScrapingStatus] = useState<string>("");

  const [finalMessage, setFinalMessage] = useState<{
    fullMessage: string;
    message: string;
    isFull: boolean;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && mapUrls.length > 0) {
      let index = 0;
      const messages = [
        (url: string) => `Scraping URL: ${url}`,
        (url: string) => `Extracting URL Title: ${url}`,
        (url: string) => `Extracting URL Description: ${url}`,
        (url: string) => `Adding URL to llms.txt: ${url}`,
      ];
      interval = setInterval(() => {
        const currentUrl = mapUrls[index];
        setScrapingStatus(messages[index % messages.length](currentUrl));
        index = (index + 1) % mapUrls.length;
      }, 750);
    } else {
      setScrapingStatus("");
    }
    return () => clearInterval(interval);
  }, [loading, mapUrls]);

  const callApi = React.useCallback(async (inputUrl: string, useFullScan: boolean, apiKey: string) => {
    if (apiKey) {
      setFirecrawlKey(apiKey);
    }
    const useApiKey = apiKey || firecrawlKey;
    const isFullScan = useFullScan && (apiKey.length > 0 || hasKey);

    setLoading(true);
    try {
      const mapResponse = await fetch("/api/map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
          bringYourOwnFirecrawlApiKey: useApiKey,
        }),
      });
      const mapData = await mapResponse.json();
      setMapUrls(mapData.mapUrls);
      const llmsResponse = await fetch("/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputUrl,
          isFull: isFullScan,
          bringYourOwnFirecrawlApiKey: useApiKey,
        }),
      });
      const llmsData = await llmsResponse.json();
      setFinalMessage({
        fullMessage: llmsData.llmsFulltxt,
        message: llmsData.llmstxt,
        isFull: isFullScan,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: commonT('error'),
        description: homeT('error.generateError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [firecrawlKey, hasKey, commonT, homeT]);

  // 处理Hero组件URL输入的函数
  const handleHeroGenerateClick = (inputUrl: string, useFullScan: boolean, apiKey: string) => {
    callApi(inputUrl, useFullScan, apiKey);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <HeroSection
        onGenerateClick={handleHeroGenerateClick}
        isLoading={loading}
        scrapingStatus={scrapingStatus}
        finalMessage={finalMessage}
        locale={locale}
      />

      {/* 主要功能区域 */}
      <section id="features" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gradient mb-4 text-3xl font-bold md:text-4xl">
              {homeT('features.title')}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              {homeT('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefitItems.map((item, index) => (
              <div key={index} className="glass-card flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作原理区域 */}
      <section id="how-it-works" className="relative bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gradient mb-4 text-3xl font-bold md:text-4xl">
              {homeT('howItWorks.title')}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              {homeT('howItWorks.description')}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-10 -z-10 hidden h-0.5 w-full bg-primary/30 md:block"></div>
                )}
                <div className="glass-card relative flex flex-col items-center text-center">
                  <div className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="mt-8">
                    <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ区域 */}
      <section id="faq" className="relative bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gradient mb-4 text-3xl font-bold md:text-4xl">
              {homeT('faq.title')}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              {homeT('faq.description')}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {faqItems.map((item, index) => (
              <div key={index} className="glass-card">
                <h3 className="mb-3 text-xl font-semibold">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card mx-auto max-w-4xl text-center">
            <h2 className="text-gradient mb-4 text-3xl font-bold md:text-4xl">
              {homeT('cta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
              {homeT('cta.description')}
            </p>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              size="lg"
              className="bg-primary px-8 py-6 text-lg text-white hover:bg-primary/90"
            >
              {homeT('cta.button')}
            </Button>
          </div>
        </div>
      </section>

      {/* 结构化数据 - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LLMs.txt Generator",
            "url": "https://llms-generator.com",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": homeT('jsonLd.description'),
            "screenshot": "https://images.unsplash.com/photo-1655720031554-a929595d5fb0?q=80&w=1200&auto=format&fit=crop",
            "featureList": [
              homeT('jsonLd.feature1'),
              homeT('jsonLd.feature2'),
              homeT('jsonLd.feature3'),
              homeT('jsonLd.feature4')
            ],
            "author": {
              "@type": "Organization",
              "name": "LLMs.txt Generator Team",
              "url": "https://llms-generator.com"
            }
          })
        }}
      />
    </div>
  );
}

// 益处数据
const benefitItems = [
  {
    title: "控制AI训练",
    description: "明确指定哪些内容可以被AI模型训练，哪些内容应该被排除",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    )
  },
  {
    title: "保护知识产权",
    description: "防止您的原创内容被未经授权地用于AI训练和生成",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    title: "提升SEO效果",
    description: "通过明确的内容使用指南，优化您的网站在AI时代的搜索引擎表现",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    title: "符合行业标准",
    description: "遵循最新的AI内容使用标准，展示您对用户数据的尊重",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  },
  {
    title: "简化实施",
    description: "我们的工具使创建和部署llms.txt文件变得简单，无需技术知识",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  {
    title: "增强用户信任",
    description: "向您的用户展示您重视他们的内容和隐私，建立更强的信任关系",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"></path>
      </svg>
    )
  }
];

// 步骤数据
const steps = [
  {
    title: "输入您的网站URL",
    description: "只需输入您的网站地址，我们的工具将开始分析您的内容"
  },
  {
    title: "自定义设置",
    description: "选择是否进行完整扫描，以获取更全面的llms.txt文件"
  },
  {
    title: "下载并部署",
    description: "下载生成的llms.txt文件，并将其放置在您网站的根目录中"
  }
];

// FAQ数据
const faqItems = [
  {
    question: "什么是llms.txt文件？",
    answer: "llms.txt是一个放置在网站根目录的文本文件，用于指定AI模型如何使用您网站的内容。它类似于robots.txt，但专门针对AI训练和使用。"
  },
  {
    question: "为什么我需要llms.txt文件？",
    answer: "随着AI技术的发展，控制您的内容如何被AI使用变得越来越重要。llms.txt文件让您能够明确指定哪些内容可以被AI训练，从而保护您的知识产权。"
  },
  {
    question: "如何在我的网站上实施llms.txt？",
    answer: "只需将生成的llms.txt文件上传到您网站的根目录（与robots.txt相同的位置）。大多数AI模型将会尊重这些指令。"
  },
  {
    question: "完整扫描和基本扫描有什么区别？",
    answer: "基本扫描只分析您网站的主要页面，而完整扫描会分析您网站上的所有页面，提供更全面的llms.txt文件。完整扫描需要API密钥。"
  },
  {
    question: "所有AI模型都会遵循llms.txt吗？",
    answer: "虽然llms.txt标准正在被越来越多的AI开发者采用，但并非所有AI模型都会遵循它。然而，实施llms.txt是表明您对内容使用偏好的重要步骤。"
  },
  {
    question: "使用这个工具需要付费吗？",
    answer: "基本功能是完全免费的。对于需要更全面分析的高级用户，我们提供完整扫描功能，需要API密钥。"
  }
];
