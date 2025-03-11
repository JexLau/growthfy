"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const FeatureCard = ({
  icon,
  title,
  description,
  stat,
  imageSrc,
}: {
  icon: string;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  imageSrc: string;
}) => {
  return (
    <div className="card-hover dark:bg-dark-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700">
      <div className="p-6">
        <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
          <i className={`${icon} text-primary-600 dark:text-primary-400 text-xl`}></i>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mb-4 text-slate-600 dark:text-slate-300">{description}</p>
        {stat && (
          <div className="dark:bg-dark-200 mt-4 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center text-sm text-slate-800 dark:text-slate-200">
              <i className="fas fa-check-circle text-secondary-500 mr-2"></i>
              <span>{stat.value} {stat.label}</span>
            </div>
          </div>
        )}
      </div>
      <div className="dark:bg-dark-200 border-t border-slate-200 bg-slate-50 dark:border-slate-700">
        <div className="p-4">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={title}
              className="object-cover"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
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
    <section id="features" ref={sectionRef} className="section-fade px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">强大功能，简单使用</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Growthfy.ai 集成多项前沿技术，将复杂的社媒数据转化为清晰可行的商业洞察。
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <FeatureCard
            icon="fas fa-bolt"
            title="实时洞察引擎"
            description="超越简单监控，提供即时可行的商业判断。AI驱动的分析引擎能够理解行业上下文，从海量信息中精准定位关键信号。"
            stat={{ value: "平均提前14天", label: "发现新兴市场趋势" }}
            imageSrc="/images/feature-insights.png"
          />

          <FeatureCard
            icon="fas fa-layer-group"
            title="跨平台信息整合"
            description="统一分析多渠道社媒数据，呈现完整市场画像。无缝连接各大社交平台，消除数据孤岛，全方位把握市场动态。"
            imageSrc="/images/feature-integration.png"
          />

          <FeatureCard
            icon="fas fa-chart-line"
            title="预测性分析"
            description="不只是回顾过去，更能预测未来趋势和机会。先进的机器学习算法分析历史数据和当前动态，预测市场趋势演变。"
            stat={{ value: "预测准确率高达87%", label: "持续自我优化" }}
            imageSrc="/images/feature-prediction.png"
          />

          <FeatureCard
            icon="fas fa-file-alt"
            title="定制化智能报告"
            description="根据企业独特需求自动生成决策辅助报告。不再需要数据分析师人工处理，系统自动生成专业可视化报告，深度剖析数据含义。"
            imageSrc="/images/feature-reports.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Features; 