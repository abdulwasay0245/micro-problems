import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Vercel issues __Secure- cookies for HTTPS domains. NextAuth edge
  // sometimes fails to infer this. Here we check the exact cookie explicitly.
  const isSecureCookie = req.cookies.has("__Secure-next-auth.session-token");

  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: isSecureCookie
  });

  const pathname = req.nextUrl.pathname;

  // Protect /admin and /report routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/report')) {
    if (!token) {
      // Redirect to sign-in, maintaining the callbackUrl
      const url = new URL('/api/auth/signin', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/report/:path*'],
};