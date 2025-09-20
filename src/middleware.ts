import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/',
    '/settings',
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};

export function middleware(request: NextRequest) {
  const authToken =
    request.cookies.get('auth_token')?.value ||
    request.cookies.get('authToken')?.value;

  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('reason', 'session_expired');

    if (request.nextUrl.pathname === '/login') return NextResponse.next();

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
