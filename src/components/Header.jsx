'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import SearchBox from './SearchBox';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { data: session } = useSession();
  const t = useTranslations();

  const user = session?.user;
  const isAuthenticated = !!session;

  const handleLogout = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Rentify
          </Link>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary-600">
              {t('nav.home')}
            </Link>
            <Link href="/properties" className="text-gray-600 hover:text-primary-600">
              {t('nav.properties')}
            </Link>
            <Link href="/properties?highlight=true" className="text-gray-600 hover:text-primary-600">
              {t('nav.featured')}
            </Link>
            <Link
              href="/properties?_sort=datePosted&_order=desc&_limit=4"
              className="text-gray-600 hover:text-primary-600"
            >
              {t('nav.recent')}
            </Link>

            {isAuthenticated && user?.role === 'tenant' && (
              <Link href="/appointments" className="text-gray-600 hover:text-primary-600">
                {t('nav.myAppointments')}
              </Link>
            )}

            {isAuthenticated && user?.role === 'owner' && (
              <Link href="/owner" className="text-gray-600 hover:text-primary-600">
                {t('nav.dashboard')}
              </Link>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-600 hover:text-primary-600">
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <SearchBox placeholder={t('nav.search') || 'Search...'} />

            <select
              value={locale}
              onChange={handleLanguageChange}
              className="text-sm border rounded px-2 py-1"
            >
              {routing.locales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>

            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary-600">
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
