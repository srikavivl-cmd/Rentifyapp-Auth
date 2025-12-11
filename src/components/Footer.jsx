'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Rentify</h3>
            <p className="text-gray-400">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white">
                  {t('nav.properties')}
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  {t('nav.login')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white">
                  {t('nav.register')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@rentify.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Main St, City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
