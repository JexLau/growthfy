"use client";

import { useRef, useEffect } from "react";

const TrustedBy = () => {
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
      className="dark:bg-dark-100 section-fade bg-slate-50 py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-slate-500 dark:text-slate-400">
          受到各行业领先企业的信赖
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {/* 这里可以替换为实际的客户标志 */}
          <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-opacity hover:opacity-100">
            <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-600"></div>
          </div>
          <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-opacity hover:opacity-100">
            <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-600"></div>
          </div>
          <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-opacity hover:opacity-100">
            <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-600"></div>
          </div>
          <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-opacity hover:opacity-100">
            <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-600"></div>
          </div>
          <div className="flex h-12 w-24 items-center justify-center opacity-60 transition-opacity hover:opacity-100">
            <div className="h-6 w-24 rounded bg-slate-300 dark:bg-slate-600"></div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-lg italic text-slate-600 dark:text-slate-300">
            "Growthfy.ai 彻底改变了我们理解市场动态的方式。从繁杂的社媒数据中提取关键洞察，帮助我们在竞争中保持领先。"
          </p>
          <p className="mt-4 font-medium">— 张总监，某知名电商品牌</p>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;