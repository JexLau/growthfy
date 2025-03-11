"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  link: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="dark:bg-dark-200 overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-video bg-slate-200 dark:bg-slate-700"></div>
      <div className="p-6">
        <div className="mb-3 flex items-center text-sm text-slate-500 dark:text-slate-400">
          <span>{post.category}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mb-4 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <Link
          href={post.link}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
        >
          阅读全文 <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

const Blog = () => {
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

  const blogPosts: BlogPost[] = [
    {
      category: "社媒趋势",
      readTime: "10分钟阅读",
      title: "2025年社交媒体营销的7个关键趋势",
      excerpt: "探索未来一年将主导社交媒体营销格局的关键趋势，以及企业如何提前布局...",
      link: "/blog/social-media-trends-2025",
    },
    {
      category: "数据分析",
      readTime: "8分钟阅读",
      title: "如何从社交媒体数据中提取有价值的商业洞察",
      excerpt: "深入了解数据分析方法，将海量社交媒体信息转化为可操作的商业策略...",
      link: "/blog/extract-business-insights",
    },
    {
      category: "案例研究",
      readTime: "12分钟阅读",
      title: "某知名快消品牌如何利用社媒洞察提升市场份额30%",
      excerpt: "详细解析该品牌如何利用社交媒体数据洞察消费者需求，重新定位产品...",
      link: "/blog/fmcg-case-study",
    },
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="dark:bg-dark-100 section-fade bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            洞察与资源
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            最新行业动态与社媒分析最佳实践
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="btn-secondary">
            浏览更多内容
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog; 