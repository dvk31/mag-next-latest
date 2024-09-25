// src/components/LogoutButton.tsx

'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
// Removed the logger import

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully'); // Use console.log or client-side logging
      router.push('/login');
    } catch (error) {
      console.error(`Logout error: ${(error as Error).message}`); // Use console.error
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
