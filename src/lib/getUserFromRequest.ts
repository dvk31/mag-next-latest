// src/lib/getUserFromRequest.ts

export function getUserFromRequest(request: Request) {
    const userId = request.headers.get('x-user-id');
    const userEmail = request.headers.get('x-user-email');
    const accessToken = request.headers.get('x-access-token');
  
    console.log('getUserFromRequest - Extracted data:', {
      userId,
      userEmail,
      accessToken: accessToken ? 'present' : 'missing',
    });
  
    return { userId, userEmail, accessToken };
  }
  