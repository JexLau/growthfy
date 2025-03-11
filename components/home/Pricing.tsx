"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface PricingFeature {
  text: string;
}

interface PricingTier {
  name: string;
  description: string;
  price: string | React.ReactNode;
  period?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
}

const PricingCard = ({
  tier,
  className = "",
}: {
  tier: PricingTier;
  className?: string;
}) => {
  return (
    <div
      className={`${
        tier.isPopular
          ? "dark:bg-dark-100 border-primary-500 dark:border-primary-400 relative flex flex-col overflow-hidden rounded-xl border-2 bg-white shadow-md transition-shadow hover:shadow-lg"
          : "dark:bg-dark-100 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700"
      } ${className}`}
    >
      {tier.isPopular && (
        <div className="absolute right-0 top-0">
          <div className="bg-primary-500 dark:bg-primary-400 px-4 py-1 text-sm font-medium text-white">
            最受欢迎
          </div>
        </div>
      )}

      <div className="border-b border-slate-200 p-6 dark:border-slate-700">
        <h3 className="mb-1 text-xl font-semibold text-slate-900 dark:text-white">
          {tier.name}
        </h3>
        <p className="mb-4 text-slate-500 dark:text-slate-400">
          {tier.description}
        </p>
        <div className="flex items-baseline">
          {typeof tier.price === "string" ? (
            <span
              className={`text-3xl font-bold ${
                tier.isPopular
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {tier.price}
            </span>
          ) : (
            tier.price
          )}
          {tier.period && (
            <span className="ml-1 text-slate-500 dark:text-slate-400">
              {tier.period}
            </span>
          )}
        </div>
      </div>

      <div className="flex-grow p-6">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-check text-secondary-500 mr-2 mt-1"></i>
              <span className="text-slate-600 dark:text-slate-300">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 p-6 dark:border-slate-700">
        <Link
          href={tier.buttonLink}
          className={`w-full text-center ${
            tier.buttonVariant === "primary" || tier.isPopular
              ? "btn-primary"
              : "btn-secondary"
          }`}
        >
          {tier.buttonText}
        </Link>
      </div>
    </div>
  );
};

const Pricing = () => {
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

  const pricingTiers: PricingTier[] = [
    {
      name: "基础版",
      description: "适合小型企业和初创团队",
      price: "¥799",
      period: "/月",
      features: [
        { text: "监控3个社交平台" },
        { text: "每日数据更新" },
        { text: "基础情感分析" },
        { text: "2个用户席位" },
        { text: "标准邮件支持" },
      ],
      buttonText: "开始免费试用",
      buttonLink: "#trial",
      buttonVariant: "secondary",
    },
    {
      name: "专业版",
      description: "适合中型企业和专业营销团队",
      price: "¥1,999",
      period: "/月",
      features: [
        { text: "监控所有主要社交平台" },
        { text: "实时数据更新" },
        { text: "高级情感分析与趋势预测" },
        { text: "10个用户席位" },
        { text: "优先电话和邮件支持" },
        { text: "定制化报告模板" },
      ],
      buttonText: "开始免费试用",
      buttonLink: "#trial",
      isPopular: true,
      buttonVariant: "primary",
    },
    {
      name: "企业版",
      description: "适合大型企业和集团",
      price: "定制",
      features: [
        { text: "无限社交平台监控" },
        { text: "实时数据更新与预警" },
        { text: "顶级AI分析引擎与定制算法" },
        { text: "无限用户席位" },
        { text: "24/7专属客户成功经理" },
        { text: "API接入与系统集成" },
      ],
      buttonText: "联系销售团队",
      buttonLink: "/contact",
      buttonVariant: "secondary",
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-fade px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            灵活定价，满足不同需求
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            从初创企业到大型集团，我们提供适合各类企业的定价方案
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            查看完整定价对比 <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 