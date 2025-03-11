"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = useTranslations('common');

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 150);
    
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="glass-button relative h-9 w-9 rounded-md"
        aria-label={t('switchTheme')}
      >
        <div className="h-5 w-5 opacity-0"></div>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="glass-button relative h-9 w-9 rounded-md"
      aria-label={t('switchTheme')}
      disabled={isAnimating}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isAnimating ? (theme === 'dark' ? 'scale-150 opacity-0' : '-translate-y-10 opacity-0') : 'scale-100 opacity-100'
        }`}>
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4 text-primary" />
          ) : (
            <MoonIcon className="h-4 w-4 text-primary" />
          )}
        </div>
        
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isAnimating ? (theme === 'dark' ? 'translate-y-0 opacity-100 scale-100' : 'scale-150 opacity-0') : (theme === 'dark' ? 'translate-y-10 opacity-0' : '-translate-y-10 opacity-0')
        }`}>
          {theme === "dark" ? (
            <MoonIcon className="h-4 w-4 text-primary" />
          ) : (
            <SunIcon className="h-4 w-4 text-primary" />
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <span className={`absolute inset-0 rounded-md transition-all duration-300 ${isAnimating ? 'bg-primary/10 border border-primary/20' : 'bg-transparent border-transparent'}`}></span>
        <span className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transform transition-all duration-500 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></span>
        <span className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transform transition-all duration-500 ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}></span>
      </div>
    </Button>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
} 