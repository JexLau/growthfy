"use client";

import Link from "next/link";
import { MessageSquare, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* 公司信息 */}
          <div>
            <div className="mb-4 flex items-center">
              <span className="text-2xl font-bold">
                Growthfy<span className="text-secondary-400">.ai</span>
              </span>
            </div>
            <p className="mb-4 text-slate-300">
              转化社媒噪声为增长洞察，让数据驱动决策不再复杂。
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-300 transition-colors hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 transition-colors hover:text-white"
              >
                <MessageSquare size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 transition-colors hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-slate-300 transition-colors hover:text-white"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* 产品 */}
          <div>
            <h4 className="mb-4 text-lg font-medium">产品</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  功能
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  产品更新
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  定价
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  集成
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  API文档
                </Link>
              </li>
            </ul>
          </div>

          {/* 公司 */}
          <div>
            <h4 className="mb-4 text-lg font-medium">公司</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  客户案例
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  合作伙伴
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 资源与联系 */}
          {/* <div>
            <h4 className="mb-4 text-lg font-medium">资源</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#blog"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  博客
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  指南与教程
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  网络研讨会
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  帮助中心
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="mb-4 text-lg font-medium">订阅更新</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="您的邮箱"
                  className="rounded-l-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
                >
                  订阅
                </button>
              </form>
            </div>
          </div> */}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-slate-400">© 2025 Growthfy.ai 版权所有</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              隐私政策
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              服务条款
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Cookie政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 