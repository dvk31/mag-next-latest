// src/lib/api.ts


const API_BASE_URL = process.env.EXTERNAL_API_BASE_URL || 'https://dev.withgpt.com/api';

import { ApiResponse } from './api.types';

// src/lib/api.ts

// src/lib/api.ts

export async function makeAuthenticatedRequest<T>(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Making authenticated request to: ${url}`);
  
      // Exclude 'Authorization' and 'authorization' from options.headers
      const { Authorization, authorization, ...otherHeaders } = options.headers || {};
  
      // Create a Headers object and set headers explicitly
      const headers = new Headers(otherHeaders);
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${accessToken}`);
  
      // Log the headers being sent
      console.log('Request headers:', Object.fromEntries(headers));
  
      const response = await fetch(url, {
        ...options,
        headers,
        // Remove 'credentials: include' as it's unnecessary for server-side requests
      });
  
      console.log(`Response status: ${response.status}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Successful response data:', data);
      return data as ApiResponse<T>;
    } catch (error) {
      console.error('Authenticated request failed:', error);
      throw error;
    }
  }
  