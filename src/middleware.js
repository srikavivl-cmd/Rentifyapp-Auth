import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/locales')
  ) {
    return NextResponse.next();
  }

  const response = intlMiddleware(request);

  const localeMatch = pathname.match(/^\/(en|es|fr)(\/|$)/);
  const pathnameLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  const protectedRoutes = ['/appointments', '/owner', '/admin', '/properties/create'];
  const pathWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/';

  const isProtected = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'rentify-secret-key-change-in-production',
    });

    if (!token) {
      const loginUrl = new URL(`/${pathnameLocale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|locales|api).*)'],
};
