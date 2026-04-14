import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const locales = ['en', 'id'];
const defaultLocale = 'en';

const publicRoutes = ['/login', '/logout'];
const protectedRoutes = ['/dashboard', '/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // skip internal
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images')
  ) {
    return;
  }

  const stripLocale = (pathname: string) => {
    return pathname.replace(/^\/(en|id)/, '') || '/';
  };

  const cleanPath = stripLocale(pathname);

  // ✅ ROOT PUBLIC CHECK
  const isRootPath = pathname === '/' || pathname === '/en' || pathname === '/id';

  // ✅ PUBLIC ROUTES (non-root)
  const isPublicRoute = publicRoutes.some((route) => {
    return cleanPath.startsWith(route);
  });

  // 🔥 redirect /en/login or /id/login → /login
  if (pathname === '/en/login' || pathname === '/id/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) => {
    return cleanPath.startsWith(route);
  });

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 🚫 protect only protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ prevent logged-in user accessing login
  if (token && cleanPath.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // 🌍 i18n logic
  const pathnameHasLocale = locales.some((locale) => {
    return pathname.startsWith(`/${locale}`);
  });

  // ❗ allow root to pass
  if (!pathnameHasLocale && !isPublicRoute && !isRootPath) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
