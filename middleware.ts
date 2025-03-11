import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

// 中间件配置，处理国际化路由
export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 本地化检测策略
  localeDetection: true,
  // 本地化前缀模式
  localePrefix: 'as-needed'
});

// 配置中间件匹配所有路由
export const config = {
  // 匹配所有路径，但排除API路由、静态资源和其他特殊路径
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 