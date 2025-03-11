import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// import { ThemeToggle } from './theme-toggle';

export function Footer() {
  const commonT = useTranslations('common');
  const footerT = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-20 overflow-hidden pb-8 pt-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="animate-float absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl filter" style={{ animationDelay: '0.5s' }}></div>
        <div className="animate-float absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-chart-2/30 blur-3xl filter" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="group mb-4 flex items-center space-x-2">
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20"></span>
                <img src="/logo.svg" alt="LLMs.txt" className="h-10 w-10" />
                <span className="absolute inset-0 rounded-md border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"></span>
              </span>
              <span className="relative">
                <span className="text-gradient text-xl font-bold">LLMs.txt</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {footerT('description')}
            </p>
            {/* <div className="flex items-center space-x-4">
              <a href="https://twitter.com/llmstxt" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group text-muted-foreground transition-colors duration-300 hover:text-primary">
                <span className="relative flex h-9 w-9 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-transparent transition-colors duration-300 group-hover:bg-primary/10"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </span>
              </a>
              <a href="https://github.com/llmstxt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group text-muted-foreground transition-colors duration-300 hover:text-primary">
                <span className="relative flex h-9 w-9 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-transparent transition-colors duration-300 group-hover:bg-primary/10"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </span>
              </a>
              <ThemeToggle />
            </div> */}
          </div>
          
          <div>
            <h3 className="relative mb-4 inline-block text-lg font-semibold">
              <span>{footerT('product')}</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/20"></span>
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <span>{commonT(link.translationKey)}</span>
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="relative mb-4 inline-block text-lg font-semibold">
              <span>{footerT('resources')}</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/20"></span>
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <span>{footerT(link.translationKey)}</span>
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="relative mb-4 inline-block text-lg font-semibold">
              <span>{footerT('company')}</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/20"></span>
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    <span>{footerT(link.translationKey)}</span>
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="glass-card mb-8 rounded-lg p-8">
          <h3 className="text-gradient mb-4 text-center text-xl font-semibold">{footerT('newsletterTitle')}</h3>
          <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
            <input 
              type="email" 
              placeholder={footerT('emailPlaceholder')} 
              className="flex-1 rounded-md border border-border bg-background/50 px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="shine-effect rounded-md bg-primary px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
              <span className="relative z-10">{footerT('subscribe')}</span>
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {footerT('newsletterDisclaimer')}
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="mb-4 text-sm text-muted-foreground md:mb-0">
            &copy; {currentYear} LLMs.txt Generator. {footerT('allRightsReserved')}
          </p>
          <div className="flex items-center space-x-6">
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {footerT(link.translationKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* 波浪装饰 */}
      <div className="absolute left-0 right-0 top-0 z-0 h-16 rotate-180 transform overflow-hidden opacity-10">
        <svg 
          className="absolute left-0 top-0 w-full"
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
      
      {/* 结构化数据 - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "LLMs.txt Generator",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": footerT('jsonLdDescription'),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "156"
            }
          })
        }}
      />
    </footer>
  );
}

const productLinks = [
  { translationKey: 'features', href: '#features' },
  { translationKey: 'howItWorks', href: '#how-it-works' },
  { translationKey: 'pricing', href: '#pricing' },
  { translationKey: 'faq', href: '#faq' }
];

const resourceLinks = [
  { translationKey: 'blog', href: '/blog' },
  { translationKey: 'documentation', href: '/docs' },
  { translationKey: 'examples', href: '/examples' },
  { translationKey: 'api', href: '/api' }
];

const companyLinks = [
  { translationKey: 'aboutUs', href: '/about' },
  { translationKey: 'contactUs', href: '/contact' },
  { translationKey: 'privacy', href: '/privacy' },
  { translationKey: 'terms', href: '/terms' }
];

const legalLinks = [
  { translationKey: 'privacy', href: '/privacy' },
  { translationKey: 'terms', href: '/terms' },
  { translationKey: 'cookiePolicy', href: '/cookies' }
]; 