// src/app/api/auth/refresh-token/route.ts

import { NextResponse } from 'next/server';
import { verifyToken, generateToken } from '@/lib/auth';
import { parse } from 'cookie';
const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token'; // Added COOKIE_NAME

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      console.warn('No cookies found in the request');
      return NextResponse.json({ success: false, message: 'No refresh token provided' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const oldToken = cookies[COOKIE_NAME];

    if (!oldToken) {
      console.warn('No refresh token found');
      return NextResponse.json({ success: false, message: 'No refresh token provided' }, { status: 401 });
    }

    const user = await verifyToken(oldToken);
    if (!user) {
      console.warn('Invalid refresh token');
      return NextResponse.json({ success: false, message: 'Invalid refresh token' }, { status: 401 });
    }

    // Generate a new token
    const newToken = await generateToken(user);

    // Set the new token in the cookie
    const response = NextResponse.json({ success: true, message: 'Token refreshed successfully' }, { status: 200 });
    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(`Token refresh failed: ${(error as Error).message}`);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
