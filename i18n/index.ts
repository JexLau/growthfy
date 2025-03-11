// 定义支持的语言
export const locales = ['en', 'ja', 'zh-Hant', 'ko', 'fr', 'it'] as const;
export type Locale = (typeof locales)[number];

// 默认语言是英语
export const defaultLocale: Locale = 'en'; 