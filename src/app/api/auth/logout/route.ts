// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.headers.append('Set-Cookie', serialize(process.env.COOKIE_NAME || 'auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    }));

    console.log('User logged out successfully');
    return response;
  } catch (error) {
    console.error(`Logout failed: ${(error as Error).message}`);
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    );
  }
}
