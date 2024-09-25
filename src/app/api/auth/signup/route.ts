// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import { createUser } from '../../../../lib/auth';
import { SignupResponse } from '../../../../lib/api.types';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      console.warn('Signup attempt with missing credentials');
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const userId = await createUser(email, password);

    console.log(`User ${email} signed up successfully with ID ${userId}`);
    return NextResponse.json(
      { message: 'User created successfully', user_id: userId },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Signup failed: ${(error as Error).message}`);
    return NextResponse.json(
      { message: (error as Error).message || 'User creation failed' },
      { status: 500 }
    );
  }
}
