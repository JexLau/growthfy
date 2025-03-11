"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 在客户端挂载后再渲染主题按钮，避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="dark:bg-dark-200/80 sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                Growthfy<span className="text-secondary-600 dark:text-secondary-400">.ai</span>
              </span>
            </Link>
          </div>

          {/* 主导航 - 桌面端 */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              产品
            </Link>
            <Link href="#solutions" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              解决方案
            </Link>
            <Link href="#pricing" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              定价
            </Link>
            <Link href="#resources" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              资源
            </Link>
            <Link href="#blog" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              博客
            </Link>
          </nav>

          {/* 次导航 - 桌面端 */}
          <div className="hidden items-center space-x-4 md:flex">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hover:text-primary-600 dark:hover:text-primary-400 rounded-full p-2 text-slate-600 focus:outline-none dark:text-slate-300"
              >
                <i className="fas fa-moon dark:hidden"></i>
                <i className="fas fa-sun hidden dark:inline"></i>
              </button>
            )}
            <Link href="/login" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              登录
            </Link>
            <Link href="#trial" className="btn-primary">
              <span>免费试用</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="flex items-center md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hover:text-primary-600 dark:hover:text-primary-400 mr-2 rounded-full p-2 text-slate-600 focus:outline-none dark:text-slate-300"
              >
                <i className="fas fa-moon dark:hidden"></i>
                <i className="fas fa-sun hidden dark:inline"></i>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:text-primary-600 dark:hover:text-primary-400 rounded-md p-2 text-slate-600 focus:outline-none dark:text-slate-300"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div
          className={`animate-fade-in border-t border-slate-200 py-4 dark:border-slate-700 md:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link href="#features" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              产品
            </Link>
            <Link href="#solutions" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              解决方案
            </Link>
            <Link href="#pricing" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              定价
            </Link>
            <Link href="#resources" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              资源
            </Link>
            <Link href="#blog" className="hover:text-primary-600 dark:hover:text-primary-400 text-slate-600 transition-colors duration-200 dark:text-slate-300">
              博客
            </Link>
            <div className="border-t border-slate-200 pt-2 dark:border-slate-700">
              <Link href="/login" className="hover:text-primary-600 dark:hover:text-primary-400 block py-2 text-slate-600 transition-colors duration-200 dark:text-slate-300">
                登录
              </Link>
              <Link href="#trial" className="btn-primary mt-2 block w-full text-center">
                免费试用
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 