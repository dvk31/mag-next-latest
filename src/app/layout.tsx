// src/app/layout.tsx

import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'My Next.js App',
  description: 'A sample application using Next.js 13 App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
