import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18n';
import {
  Navbar,
  Footer
} from '@/components/home';
import { getMessages, setRequestLocale } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // 验证当前语言是否在支持的语言列表中
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-dark-200">
        <Navbar />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}



