"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

const CaseStudyCard = ({
  industry,
  title,
  description,
  stat,
  statLabel,
}: {
  industry: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}) => {
  return (
    <div className="dark:bg-dark-200 overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video bg-slate-200 dark:bg-slate-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="text-white opacity-80" size={48} />
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="mr-3 h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">{industry}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">美妆行业</p>
          </div>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mb-4 text-slate-600 dark:text-slate-300">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-secondary-600 dark:text-secondary-400 font-medium">{stat}</span>
            <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">{statLabel}</span>
          </div>
          <Link
            href="/case-studies"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors flex items-center"
          >
            查看完整案例 <ArrowRight className="ml-1" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
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
            客户成功案例
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            了解领先企业如何利用Growthfy.ai实现数据驱动增长
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <CaseStudyCard
            industry="领先美妆品牌"
            title="通过社媒洞察捕捉新兴美妆趋势"
            description="该品牌借助Growthfy.ai提前6个月发现关键美妆趋势，迅速调整产品线，在新品类中获得领先市场份额。"
            stat="32%"
            statLabel="新品收入增长"
          />

          <CaseStudyCard
            industry="新兴科技企业"
            title="利用用户反馈优化产品体验"
            description="该公司通过Growthfy.ai整合多平台用户讨论，发现关键改进点，产品满意度大幅提升，负面评价减少65%。"
            stat="43%"
            statLabel="复购率提升"
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudies; 