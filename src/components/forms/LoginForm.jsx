'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';

export default function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const { locale } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push(`/${locale}`);
      router.refresh();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6">{t('auth.login')}</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('auth.email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('auth.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? t('common.loading') : t('auth.loginButton')}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        {t('auth.noAccount')}{' '}
        <Link href="/register" className="text-primary-600 hover:underline">
          {t('auth.register')}
        </Link>
      </p>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Demo accounts (password: password123):</p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>Tenant: tenant8@rentify.com</li>
          <li>Owner: owner4@rentify.com</li>
          <li>Admin: admin1@rentify.com</li>
        </ul>
      </div>
    </div>
  );
}
