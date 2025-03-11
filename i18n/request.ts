import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // 动态导入对应语言的翻译文件
  const locale = await requestLocale;
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale,
  };
}); 