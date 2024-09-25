  // src/lib/api.types.ts
  
  export interface ApiResponse<T> {
    data: T;
  }
  
  export interface ApiError {
    message: string;
  }
  
  // Define specific response types as needed
  export interface LoginResponse {
    message: string;
    id: string;
    username: string;
    email: string;
    full_name: string | null;
    access_token: string;
    refresh_token: string;
  }
  
  export interface SignupResponse {
    message: string;
    user_id: string;
  }
  
  export interface UserResponse {
    id: string;
    email: string;
    username: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    profile: {
      bio: string;
      birth_date: string | null;
      location: string;
    };
  }
  
  export interface Publication {
    id: string;
    name: string;
    publication_type: string;
    description: string;
    privacy: string;
    logo: {
      id: string;
      file: string;
    } | null;
    cover_image: {
      id: string;
      file: string;
    } | null;
    publication_video: string | null;
    created_by: {
      id: string;
      email: string;
    };
    members: Array<{
      id: string;
      user: {
        id: string;
        email: string;
      };
    }>;
  }
  
  export type PublicationsResponse = Publication[];
  