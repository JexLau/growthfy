"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

const SolutionCard = ({
  icon,
  title,
  bgColor,
  pain,
  solution,
  outcome,
}: {
  icon: string;
  title: string;
  bgColor: string;
  pain: string;
  solution: string;
  outcome: string;
}) => {
  return (
    <div className="dark:bg-dark-100 card-hover overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700">
      <div className={`${bgColor} relative h-40`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={`${icon} text-5xl text-white`}></i>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <div className="mb-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            核心痛点
          </span>
          <p className="mt-1 text-slate-700 dark:text-slate-300">{pain}</p>
        </div>
        <div className="mb-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Growthfy.ai 解决方案
          </span>
          <p className="mt-1 text-slate-700 dark:text-slate-300">{solution}</p>
        </div>
        <div className="mb-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            预期成果
          </span>
          <p className="mt-1 text-slate-700 dark:text-slate-300">{outcome}</p>
        </div>
        <Link
          href="/solutions"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          了解更多 <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

const Solutions = () => {
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
      id="solutions"
      ref={sectionRef}
      className="section-fade px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            适合各类企业场景
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            无论您是营销团队、产品部门还是企业决策层，Growthfy.ai 都能提供精准洞察
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <SolutionCard
            icon="fas fa-bullhorn"
            title="市场营销团队"
            bgColor="bg-primary-600 dark:bg-primary-800"
            pain="难以实时把握消费者情绪变化，营销活动效果评估滞后"
            solution="实时情感分析与营销活动效果追踪，提供竞品对比分析"
            outcome="营销ROI平均提升32%，消费者洞察获取速度提升5倍"
          />

          <SolutionCard
            icon="fas fa-box"
            title="产品团队"
            bgColor="bg-secondary-600 dark:bg-secondary-800"
            pain="用户反馈收集分散且低效，难以识别真正的产品改进方向"
            solution="整合多渠道用户反馈，智能分类产品讨论热点与问题"
            outcome="产品迭代决策时间缩短40%，用户满意度提升25%"
          />

          <SolutionCard
            icon="fas fa-briefcase"
            title="企业决策层"
            bgColor="bg-slate-700 dark:bg-slate-800"
            pain="市场趋势把握不及时，战略决策缺乏数据支撑"
            solution="行业趋势预测与竞争态势分析，提供战略决策支持"
            outcome="战略决策准确性提升45%，市场机会捕获率提高35%"
          />
        </div>
      </div>
    </section>
  );
};

export default Solutions; 