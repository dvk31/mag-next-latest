// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  console.log('Middleware - Incoming request:', req.url);

  const authToken = req.cookies.get(process.env.COOKIE_NAME || 'auth_token')?.value;
  const externalAccessToken = req.cookies.get('external_access_token')?.value;

  console.log('Middleware - Token from cookie:', authToken);

  if (!authToken) {
    console.warn(`Unauthorized access attempt to ${req.nextUrl.pathname}`);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const user = await verifyToken(authToken);
    if (!user) {
      console.warn(`Invalid token for access to ${req.nextUrl.pathname}`);
      return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log('Middleware - Verified user:', user);

    // Create a new request with modified headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', user.id);
    requestHeaders.set('x-user-email', user.email);
    requestHeaders.set('x-access-token', externalAccessToken || '');
    requestHeaders.set('Authorization', `Bearer ${externalAccessToken || ''}`);

    console.log('Middleware - Setting headers:', {
      'x-user-id': user.id,
      'x-user-email': user.email,
      'x-access-token': externalAccessToken ? 'present' : 'missing',
    });

    // Use rewrite to internally redirect to the API route with the modified headers
    const response = NextResponse.rewrite(new URL(req.url));
    response.headers.set('x-user-id', user.id);
    response.headers.set('x-user-email', user.email);
    response.headers.set('x-access-token', externalAccessToken || '');
    response.headers.set('Authorization', `Bearer ${externalAccessToken || ''}`);

    console.log('Middleware - Final response headers:', Object.fromEntries(response.headers));

    return response;
  } catch (error) {
    console.error('Middleware - Error processing request:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/me',
    '/api/publications',
    '/publications/:path*',
    '/api/protected-route/:path*',
  ],
};
