import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page and public assets
  if (pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  // For client-side auth, we'll let the AuthWrapper handle the redirect
  // Middleware will just pass through and let client-side handle auth
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};