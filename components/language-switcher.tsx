import { Fragment } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { locales } from '@/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { Check, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

// 语言名称映射
const languageNames: Record<string, string> = {
  'en': 'English',
  'ja': '日本語',
  'zh-Hant': '繁體中文',
  'ko': '한국어',
  'fr': 'Français',
  'it': 'Italiano',
};

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // 获取当前路径，并替换语言部分
  const switchLanguage = (newLocale: string) => {
    // 检查当前路径是否包含语言部分
    if (pathname === '/') {
      // 如果是根路径，直接添加新语言
      router.push(`/${newLocale}`);
    } else {
      // 检查路径中是否已有语言前缀
      const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
        ? pathname.substring(`/${locale}`.length) || '/'
        : pathname;
        
      // 构建新路径
      const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
      router.push(newPath);
    }
    router.refresh();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span>{t('language')}</span>
        </Button> */}
        <Button className="shine-effect group relative hidden overflow-hidden bg-primary text-white hover:bg-primary/90 md:inline-flex">
          <Languages className="h-4 w-4" />
          <span>{t('language')}</span>
          <span className="absolute right-2 h-5 w-5 origin-center rounded-full bg-white/20 opacity-0 transition-all duration-500 group-hover:scale-[15] group-hover:opacity-10"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-2">
          {locales.map((l) => (
            <Button
              key={l}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                l === locale ? "bg-accent text-accent-foreground" : ""
              )}
              onClick={() => switchLanguage(l)}
            >
              <div className="flex w-full items-center justify-between">
                <span>{languageNames[l]}</span>
                {l === locale && <Check className="h-4 w-4" />}
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 