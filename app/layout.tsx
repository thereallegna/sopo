'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from '@radix-ui/react-toast';
import { ToastApp } from '@components/ui/Toast';
import useToastStore from '@stores/useToastStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
    },
  },
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { show, title, theme, setToast } = useToastStore();
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          <ToastProvider>
            {children}
            <ToastApp
              title={title}
              open={show}
              theme={theme}
              onOpenChange={(open) => setToast(open)}
            />
          </ToastProvider>
        </body>
        <ReactQueryDevtools initialIsOpen={false} />
      </html>
    </QueryClientProvider>
  );
};

export default RootLayout;
