'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

export default function AuthRedirect({ redirectTo, roleRequired, children }) {
  const router = useRouter();
  const { locale } = useParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push(`/${locale}/login`);
      return;
    }

    if (roleRequired && session?.user?.role !== roleRequired) {
      router.push(`/${locale}/login`);
      return;
    }

    if (redirectTo && status === 'authenticated') {
      const user = session?.user;
      if (user?.role === 'admin') {
        router.push(`/${locale}/admin`);
      } else if (user?.role === 'owner') {
        router.push(`/${locale}/owner`);
      } else {
        router.push(`/${locale}${redirectTo}`);
      }
    }
  }, [status, session, router, locale, redirectTo, roleRequired]);

  if (status === 'loading') {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  return children;
}
