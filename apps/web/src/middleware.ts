import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.has('auth-token'); // Adjust based on your auth token name

  // Protected routes
  if (pathname.startsWith('/dashboard') && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Auth routes when already logged in
  if ((pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};