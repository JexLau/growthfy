"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './button';
import { LanguageSwitcher } from '../language-switcher';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 glass-morphism border-b border-primary/10' : 'py-4 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className="absolute inset-0 rounded-md bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20"></span>
              <img src={'/logo.svg'} alt="LLMs.txt Generator" className="relative z-10 h-10 w-10" />
              <span className="absolute inset-0 rounded-md border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"></span>
            </span>
            <span className="relative">
              <span className="text-gradient text-xl font-bold">LLMs.txt</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden items-center space-x-6 md:flex">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group relative text-foreground transition-colors duration-300 hover:text-primary"
                >
                  {t(item.translationKey)}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              {/* <Button className="shine-effect group relative hidden overflow-hidden bg-primary text-white hover:bg-primary/90 md:inline-flex">
                <span className="relative z-10">{t('getStarted')}</span>
                <span className="absolute right-2 h-5 w-5 origin-center rounded-full bg-white/20 opacity-0 transition-all duration-500 group-hover:scale-[15] group-hover:opacity-10"></span>
              </Button> */}
              <LanguageSwitcher />

              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary md:hidden"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="glass-card flex flex-col space-y-3 p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="rounded-md px-3 py-2 text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.translationKey)}
              </Link>
            ))}
            <Button className="shine-effect mt-2 w-full bg-primary text-white hover:bg-primary/90">
              {t('getStarted')}
            </Button>
            
          </div>
        </div>
      </div>
    </header>
  );
}

const navItems = [
  { translationKey: 'features', href: '#features' },
  { translationKey: 'howItWorks', href: '#how-it-works' },
  { translationKey: 'faq', href: '#faq' },
  { translationKey: 'contactUs', href: '#contact' },
]; 