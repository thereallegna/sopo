'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body>{children}</body>
      <ReactQueryDevtools initialIsOpen={false} />
    </html>
  </QueryClientProvider>
);

export default RootLayout;
