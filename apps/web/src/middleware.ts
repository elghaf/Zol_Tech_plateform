import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.has('auth-token');
  
  console.log(`Middleware running for path: ${pathname}`);
  console.log(`Auth cookie present: ${isAuth}`);

  // Protected routes
  if (pathname.startsWith('/dashboard') && !isAuth) {
    console.log('Access denied: Redirecting to login page');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Auth routes when already logged in
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && isAuth) {
    console.log('Already authenticated: Redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('Middleware allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
};


