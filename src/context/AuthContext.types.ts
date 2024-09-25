// src/context/AuthContext.types.ts

export interface UserProfile {
    bio: string;
    birth_date: string | null;
    location: string;
  }
  
  export interface User {
    id: string;
    email: string;
    username: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    profile: UserProfile;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    refreshToken: () => Promise<void>;
  }
  