"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
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
      ref={sectionRef}
      className="section-fade px-4 pb-24 pt-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="mb-10 lg:mb-0 lg:w-1/2">
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              转化社媒噪声为
              <span className="text-primary-600 dark:text-primary-400">增长洞察</span>
              ，让数据驱动决策不再复杂
            </h1>
            <p className="mb-8 text-lg text-slate-600 dark:text-slate-300 md:text-xl">
              Growthfy.ai 帮助企业将无序的社交媒体信息流转化为有序的商业智能，发现隐藏的市场趋势、消费者情绪和竞争动态，让您领先一步把握市场机遇。
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="#trial" className="btn-primary">
                <span>免费开始</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link href="#features" className="btn-secondary">
                <span>了解更多</span>
                <i className="fas fa-chevron-down ml-2"></i>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <div className="dark:bg-dark-100 bg-slate-100 p-1">
                <div className="mb-1 flex space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="dark:bg-dark-300 overflow-hidden rounded-lg bg-white">
                  <div className="relative h-[300px] w-full">
                    <Image 
                      src="/images/dashboard-preview.png" 
                      alt="Growthfy.ai 平台界面预览" 
                      className="object-cover"
                      fill
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 