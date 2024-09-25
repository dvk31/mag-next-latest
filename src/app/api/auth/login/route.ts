// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { authenticateUser, generateToken, fetchUserData } from '@/lib/auth';

const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      console.warn('Login attempt with missing credentials');
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user with external API
    const { accessToken } = await authenticateUser(email, password);

    // Fetch user data using the access token
    const user = await fetchUserData(accessToken);

    // Generate a JWT for your application
    const appToken = await generateToken(user);

    // Create a response and set the auth_token and external_access_token cookies
    const response = NextResponse.json({ success: true, message: 'Login successful' });

    // Set the internal auth_token cookie
    response.cookies.set(COOKIE_NAME, appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    // Set the external access_token cookie
    response.cookies.set('external_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // Adjust based on the token's expiry
      path: '/',
    });

    console.log(`User ${email} logged in successfully`);
    return response;
  } catch (error) {
    console.error(`Login failed: ${(error as Error).message}`);
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
