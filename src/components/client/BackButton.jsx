'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BackButton() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 text-primary-600 hover:underline flex items-center gap-2"
    >
      &larr; {t('common.back')}
    </button>
  );
}
