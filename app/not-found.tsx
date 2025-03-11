import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('common');
  const notFoundT = useTranslations('notFound');
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">{notFoundT('title')}</h2>
        <p className="mt-2 text-lg">{notFoundT('description')}</p>
        <div className="mt-6">
          <Link 
            href="/" 
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('home')}
          </Link>
        </div>
      </div>
    </div>
  );
} 