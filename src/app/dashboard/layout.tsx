// src/app/dashboard/layout.tsx

'use client';

import React from 'react';
import LogoutButton from '@/components/LogoutButton';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handlePublicationClick = () => {
    router.push('/dashboard/publications');
   
  };

  return (
    <div className="dashboard-layout">
      <nav>
        <h2>Dashboard</h2>
        <button onClick={handlePublicationClick}>Publications</button>
        <LogoutButton />
      </nav>
      <main>{children}</main>
    </div>
  );
}
