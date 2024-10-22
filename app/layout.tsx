'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const queryClient = new QueryClient();

// Simplified arrow function with implicit return
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body>{children}</body>
    </html>
  </QueryClientProvider>
);

export default RootLayout;
