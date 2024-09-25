// src/app/api/me/route.ts

// src/app/api/me/route.ts

import { NextResponse } from 'next/server';
import { UserResponse } from '@/lib/api.types';
import { getUserFromRequest } from '@/lib/getUserFromRequest';

export async function GET(request: Request) {
  try {
    const { userId, userEmail, accessToken } = getUserFromRequest(request);

    const userResponse: UserResponse = {
      id: userId,
      email: userEmail,
      // Populate other fields as needed
    };

    return NextResponse.json({ success: true, data: userResponse }, { status: 200 });
  } catch (error) {
    console.error(`Fetching user info failed: ${(error as Error).message}`);
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
}