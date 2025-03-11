"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { useTheme } from 'next-themes';
import { Label } from './label';
import { Switch } from './switch';
import { Input } from './input';
import { ExternalLinkIcon, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  locale: string;
  onGenerateClick?: (url: string, wantsFull: boolean, firecrawlKey: string) => void;
  isLoading?: boolean;
  scrapingStatus?: string;
  finalMessage?: {
    fullMessage: string;
    message: string;
    isFull: boolean;
  } | null;
}

export function HeroSection({
  onGenerateClick,
  isLoading = false,
  scrapingStatus = "",
  finalMessage = null,
  locale
}: HeroSectionProps) {
  const { theme } = useTheme();
  
  const t = useTranslations('home.hero');
  const commonT = useTranslations('common');
  
  const [hoverState, setHoverState] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [wantsFull, setWantsFull] = useState(false);
  const [firecrawlKey, setFirecrawlKey] = useState('');

  const handleGenerateClick = () => {
    // 简单的URL验证
    if (!inputValue.trim()) {
      setInputError(t('enterWebsiteUrl'));
      return;
    }

    let url = inputValue.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    try {
      new URL(url);
      setInputError('');
      if (onGenerateClick) {
        onGenerateClick(url, wantsFull, firecrawlKey);
      }
    } catch (e) {
      setInputError(t('enterValidUrl'));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerateClick();
    }
  };

  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* 动态背景元素 */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="animate-float absolute left-1/4 top-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl filter"></div>
        <div className="animate-float absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-secondary/40 blur-3xl filter" style={{ animationDelay: '1.5s' }}></div>
        <div className="animate-float absolute right-1/3 top-1/3 h-60 w-60 rounded-full bg-chart-3/30 blur-3xl filter" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* 装饰元素 */}
      <div className="animate-float absolute left-[10%] top-[15%] h-12 w-12" style={{ animationDelay: '0.5s' }}>
        <div className="relative h-full w-full">
          <div className="animate-pulse-slow absolute inset-0 rotate-45 rounded-lg bg-primary/20"></div>
          <div className="absolute inset-0 rotate-12 rounded-lg border border-primary/40"></div>
        </div>
      </div>

      <div className="animate-float absolute bottom-[20%] right-[15%] h-16 w-16" style={{ animationDelay: '2s' }}>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-chart-2/20"></div>
          <div className="absolute inset-0 scale-110 rounded-full border-2 border-chart-2/40"></div>
          <div className="absolute inset-0 scale-125 rounded-full border border-chart-2/20"></div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="animate-fade-in relative z-10 mx-auto max-w-6xl text-center">
        <div className="mb-8">
          <span className="animate-pulse-slow shine-effect mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {t('aiOptimizationTool')}
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient">LLMs.txt</span> {t('generator')}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground md:text-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="glass-card animate-slide-up card-rotate-animation mx-auto mb-12 max-w-2xl p-8">
          <div className="mb-6">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="relative w-full flex-1">
                <input
                  type="text"
                  placeholder={t('inputPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-background/50 border ${inputError ? 'border-destructive' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  onFocus={() => setHoverState(true)}
                  onBlur={() => setHoverState(false)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                {hoverState && (
                  <div className="animate-pulse-slow absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-r from-primary/50 to-chart-2/50 opacity-30 blur"></div>
                )}
                {inputError && (
                  <p className="mt-1 text-left text-xs text-destructive">{inputError}</p>
                )}
              </div>
              <Button
                className="shine-effect w-full rounded-lg bg-primary px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 md:w-auto"
                onClick={handleGenerateClick}
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="-ml-1 mr-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {commonT('processing')}
                    </>
                  ) : t('generateButton')}
                </span>
              </Button>
            </div>
          </div>

          <div className="mb-6 flex items-center space-x-2">
            <Switch
              id="full-scan"
              checked={wantsFull}
              onCheckedChange={setWantsFull}
              disabled={isLoading}
            />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-1">
                <Label
                  htmlFor="full-scan"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('fullScan')}
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('fullScanDescription')}
              </p>
            </div>
          </div>

          {wantsFull && (
            <div className="mb-6">
              <Label
                htmlFor="api-key"
                className="mb-2 block text-sm font-medium"
              >
                {t('apiKey')}
              </Label>
              <Input
                id="api-key"
                placeholder={t('apiKeyPlaceholder')}
                value={firecrawlKey}
                onChange={(e) => setFirecrawlKey(e.target.value)}
                type="password"
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {t('noApiKey')}{" "}
                <a
                  href="https://firecrawl.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {t('getFreeKey')}
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </p>
            </div>
          )}

          {isLoading && scrapingStatus && (
            <div className="mb-6 rounded-lg bg-muted/30 p-4">
              <div className="mb-2 flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                <p className="text-sm font-medium">{commonT('processing')}</p>
              </div>
              <p className="text-sm text-muted-foreground">{scrapingStatus}</p>
            </div>
          )}

          {finalMessage && (
            <div className="mb-6">
              <Label className="mb-2 block text-lg font-medium">
                {t('yourFileReady')}
              </Label>
              <div className="rounded-lg bg-muted/30 p-4">
                <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
                  {finalMessage.isFull
                    ? finalMessage.fullMessage
                    : finalMessage.message}
                </pre>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      finalMessage.isFull
                        ? finalMessage.fullMessage
                        : finalMessage.message
                    );
                    toast({
                      title: commonT('copied'),
                      description: t('copySuccess'),
                    });
                  }}
                  variant="outline"
                  className="mr-2"
                >
                  {commonT('copyToClipboard')}
                </Button>
                <Button
                  onClick={() => {
                    const blob = new Blob(
                      [
                        finalMessage.isFull
                          ? finalMessage.fullMessage
                          : finalMessage.message,
                      ],
                      { type: "text/plain" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "llms.txt";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  {t('downloadButton')}
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            {t('subtitle')}
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card scaleOnHover flex flex-col items-center p-6 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="animate-pulse-slow mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5" style={{ animationDelay: `${index * 0.5}s` }}>
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex animate-bounce justify-center">
        <div className="rounded-full border border-primary/20 bg-primary/10 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* 装饰性SVG图形 */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-[20vh] overflow-hidden opacity-20">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="0.2"
            className="text-primary"
            d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,133.3C672,128,768,192,864,224C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

const features = [
  {
    title: "SEO优化",
    description: "通过llms.txt文件控制AI如何索引您的内容，提升SEO效果",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    title: "内容保护",
    description: "明确指定哪些内容可以被AI模型训练，保护您的知识产权",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    title: "AI友好",
    description: "优化您的网站与AI系统的互动方式，提升用户体验",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"></path>
      </svg>
    )
  }
]; 