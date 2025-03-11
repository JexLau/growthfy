"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="trial"
      ref={sectionRef}
      className="bg-primary-600 dark:bg-primary-900 section-fade px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-white">
              准备好转变您的数据分析方式了吗？
            </h2>
            <p className="text-primary-100 mb-6 text-xl">
              注册14天免费试用，无需信用卡，发现Growthfy.ai如何帮助您从社交媒体中获取关键洞察。
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-white" size={20} />
                <span className="text-white">无需信用卡</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-white" size={20} />
                <span className="text-white">全功能体验</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-white" size={20} />
                <span className="text-white">专家支持</span>
              </div>
            </div>
          </div>
          <div className="dark:bg-dark-100 lg:w-5/12 rounded-xl bg-white p-8 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
              立即开始免费试用
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  className="dark:bg-dark-200 focus:border-primary-500 dark:focus:border-primary-400 w-full rounded-lg border border-slate-300 p-3 outline-none dark:border-slate-600"
                  placeholder="您的姓名"
                />
              </div>
              <div>
                <label htmlFor="company" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  公司名称
                </label>
                <input
                  type="text"
                  id="company"
                  className="dark:bg-dark-200 focus:border-primary-500 dark:focus:border-primary-400 w-full rounded-lg border border-slate-300 p-3 outline-none dark:border-slate-600"
                  placeholder="您的公司名称"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  className="dark:bg-dark-200 focus:border-primary-500 dark:focus:border-primary-400 w-full rounded-lg border border-slate-300 p-3 outline-none dark:border-slate-600"
                  placeholder="您的邮箱地址"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg px-4 py-3 text-center font-medium text-white transition-colors"
              >
                开始免费试用
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                注册即表示您同意我们的{" "}
                <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                  服务条款
                </Link>{" "}
                和{" "}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  隐私政策
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 