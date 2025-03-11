"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const Step = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => {
  return (
    <div className="dark:bg-dark-200 flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-primary-100 dark:bg-primary-900 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <span className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
          {number}
        </span>
      </div>
      <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
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
      className="dark:bg-dark-100 section-fade bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Growthfy.ai 如何工作
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            四个简单步骤，从海量社媒数据到精准商业洞察
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Step
            number={1}
            title="连接数据源"
            description="一键连接各大社交平台，无缝采集实时数据流，告别手动收集时代。"
          />
          <Step
            number={2}
            title="AI分析处理"
            description="强大AI引擎自动分析情感、话题和趋势，从海量信息中提炼关键洞察。"
          />
          <Step
            number={3}
            title="生成洞察报告"
            description="自动生成直观、专业的可视化报告，深度解读数据背后的商业意义。"
          />
          <Step
            number={4}
            title="采取行动"
            description="基于数据洞察制定策略并快速实施，抢占市场先机，提升决策效率。"
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/demo" className="btn-secondary">
            <span>查看详细演示</span>
            <i className="fas fa-play-circle ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 