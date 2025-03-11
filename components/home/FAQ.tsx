"use client";

import { useState, useRef, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion = ({ faq, index }: { faq: FAQItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-slate-50 dark:bg-dark-100 dark:hover:bg-dark-200"
      >
        <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
        <i
          className={`fas fa-chevron-down text-slate-500 dark:text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>
      <div
        className={`dark:bg-dark-200 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
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

  const faqItems: FAQItem[] = [
    {
      question: "Growthfy.ai支持哪些社交媒体平台？",
      answer:
        "Growthfy.ai支持几乎所有主流社交媒体平台，包括微博、微信、小红书、抖音、知乎、B站等国内平台，以及Twitter、Facebook、Instagram、LinkedIn、YouTube、TikTok等国际平台。我们不断扩展支持的平台范围，以确保全面覆盖您的目标受众。",
    },
    {
      question: "数据更新频率如何？能否实时监控？",
      answer:
        "基础版每日更新数据，专业版和企业版提供实时数据监控能力。对于重要事件或品牌危机，我们的系统会自动提高监控频率，确保您能及时获取关键信息并快速响应。",
    },
    {
      question: "Growthfy.ai是否支持自定义关键词监控？",
      answer:
        "是的，所有版本都支持自定义关键词监控。基础版支持最多20个关键词，专业版支持100个关键词，企业版支持无限关键词。此外，我们的AI系统会自动识别相关词汇和话题，确保您不会错过任何重要讨论。",
    },
    {
      question: "需要多长时间才能看到有价值的洞察？",
      answer:
        "在初始设置完成后，基本洞察通常在24-48小时内可用。随着系统持续收集和分析数据，洞察质量会不断提升。对于完整的趋势分析和预测，通常需要2-4周的数据积累，以确保结果的准确性和可靠性。",
    },
    {
      question: "是否提供API接口供系统集成？",
      answer:
        "是的，企业版提供完整的API接口，支持与您现有的数据系统、CRM、商业智能工具等无缝集成。我们提供详细的API文档和技术支持，确保集成过程顺利进行。专业版提供有限的API访问权限。",
    },
  ];

  return (
    <section ref={sectionRef} className="section-fade px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">常见问题</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">了解更多关于Growthfy.ai的信息</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <FAQAccordion key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 