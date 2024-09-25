// /app/api/publications/route.ts

import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/getUserFromRequest';
import { makeAuthenticatedRequest } from '@/lib/api';
import { PublicationsResponse } from '@/lib/api.types';

export async function GET(request: Request) {
  console.log('Publications Route - Incoming request headers:', Object.fromEntries(request.headers));

  try {
    const { userId, userEmail, accessToken } = getUserFromRequest(request);

    console.log('Publications Route - Extracted user data:', {
      userId,
      userEmail,
      accessToken: accessToken ? 'present' : 'missing',
    });

    if (!accessToken) {
      console.warn('Access token is missing in the request headers');
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    console.log(`Publications Route - About to fetch publications for user: ${userId}`);
    console.log(`Publications Route - Using access token: ${accessToken.substring(0, 10)}...`);

    try {
      const publicationsResponse = await makeAuthenticatedRequest<PublicationsResponse>(
        '/publications/',
        accessToken
      );
      console.log('Publications Route - Successfully fetched publications');
      console.log('Publications data:', publicationsResponse);

      // Return the publications data directly
      return NextResponse.json(publicationsResponse, { status: 200 });
    } catch (error) {
      console.error(`Publications Route - Fetching publications failed:`, error);
      return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
  } catch (error) {
    console.error(`Publications Route - An unexpected error occurred:`, error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
