'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from '@radix-ui/react-toast';
import { ToastApp } from '@components/ui/Toast';
import useToastStore from '@stores/useToastStore';

// Komponen khusus client untuk Toast
const ToastClient = () => {
  const { show, title, theme, setToast } = useToastStore();
  return (
    <ToastApp
      title={title}
      open={show}
      theme={theme}
      onOpenChange={(open) => setToast(open)}
    />
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
    },
  },
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          {children}
          <ToastClient />
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
