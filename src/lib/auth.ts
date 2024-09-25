// src/lib/auth.ts

import { SignJWT, jwtVerify } from 'jose';
import { ApiResponse, LoginResponse } from './api.types';
import { User } from '../context/AuthContext.types';

// ------------------------
// Configuration Constants
// ------------------------

// Secret key for signing and verifying JWTs.
// Ensure this is a strong, random string in production environments.
// It's recommended to store this in environment variables.
const AUTH_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'default-secret');

// Name of the authentication cookie.
// Can be customized via environment variables.
const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token';

// Base URL for the external API your application interacts with.
// Ensure this is correctly set in your environment variables.
const API_BASE_URL = process.env.EXTERNAL_API_BASE_URL || 'https://dev.withgpt.com/api';

// ------------------------
// Helper Functions
// ------------------------

/**
 * Makes an authenticated request to the external API.
 * @param endpoint - The API endpoint to interact with.
 * @param accessToken - The JWT access token for authentication.
 * @param options - Additional fetch options.
 * @returns The parsed JSON response from the API.
 * @throws Will throw an error if the request fails.
 */
export async function makeAuthenticatedRequest<T>(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    const data = await response.json();
    return { data } as ApiResponse<T>;
  } catch (error) {
    console.error('Authenticated request failed:', error);
    throw error;
  }
}

// ------------------------
// Authentication Functions
// ------------------------

/**
 * Authenticates a user by verifying their email and password.
 * Communicates with the external API to perform authentication.
 * @param email - User's email address.
 * @param password - User's password.
 * @returns A promise that resolves to the access token and user data.
 * @throws Will throw an error if authentication fails.
 */
export async function authenticateUser(email: string, password: string): Promise<{ accessToken: string; user: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
  
      const data: LoginResponse = await response.json();
      const accessToken = data.access_token;
  
      // Create a user object from the response data
      const user: User = {
        id: data.id,
        email: data.email,
        username: data.username,
        // Add other user properties as needed
      };
  
      if (!accessToken) {
        throw new Error('Access token not found in response');
      }
  
      return { accessToken, user };
    } catch (error) {
      console.error(`Login failed: ${(error as Error).message}`);
      throw new Error('Authentication failed');
    }
  }
/**
 * Registers a new user by communicating with the external API.
 * @param email - New user's email address.
 * @param password - New user's password.
 * @returns A promise that resolves to the new user's ID.
 * @throws Will throw an error if signup fails.
 */
export async function createUser(email: string, password: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Signup failed');
    }

    const data = await response.json();
    return data.user_id; // Ensure the external API returns 'user_id'
  } catch (error) {
    console.error(`Signup failed: ${(error as Error).message}`);
    throw new Error('Signup failed');
  }
}

/**
 * Generates a JWT token for a given user.
 * Utilizes the 'jose' library to sign the token securely.
 * @param user - The user object containing necessary information.
 * @returns A promise that resolves to the signed JWT token string.
 * @throws Will throw an error if token generation fails.
 */
export async function generateToken(user: User): Promise<string> {
  try {
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      username: user.username,
      // Add other user properties as needed
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(AUTH_SECRET);
    return token;
  } catch (error) {
    console.error(`Token generation failed: ${(error as Error).message}`);
    throw new Error('Token generation failed');
  }
}

/**
 * Verifies a JWT token to ensure it's valid and not tampered with.
 * Utilizes the 'jose' library for verification.
 * @param token - The JWT token string to verify.
 * @returns A promise that resolves to the decoded user object if valid, otherwise null.
 */
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, AUTH_SECRET);
    return payload as unknown as User; // Cast payload to User type
  } catch (error) {
    console.error(`Token verification failed: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Fetches user data from the external API using the provided access token.
 * @param accessToken - The access token from the external API.
 * @returns A promise that resolves to the user data.
 * @throws Will throw an error if fetching user data fails.
 */
export async function fetchUserData(accessToken: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch user data');
    }

    const data = await response.json();
    return data as User; // Adjust the type as needed
  } catch (error) {
    console.error(`Failed to fetch user data: ${(error as Error).message}`);
    throw new Error('Failed to fetch user data');
  }
}

/**
 * Refreshes an existing authentication token by communicating with the external API.
 * @param oldToken - The current JWT access token.
 * @returns A promise that resolves to the new JWT access token string or null if refresh fails.
 */
export async function refreshAuthToken(oldToken: string): Promise<string | null> {
  try {
    const response = await makeAuthenticatedRequest<{ token: string }>(
      '/auth/refresh/',
      oldToken,
      {
        method: 'POST',
      }
    );

    if (response && response.data && typeof response.data.token === 'string') {
      return response.data.token;
    } else {
      console.error('Invalid response format from /auth/refresh/:', response);
      return null;
    }
  } catch (error) {
    console.error(`Token refresh failed: ${(error as Error).message}`);
    return null;
  }
}
