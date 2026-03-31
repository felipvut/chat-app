'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { App } from '@capacitor/app';
import type { BackButtonListenerEvent } from '@capacitor/app';
import { useRouter } from "next/navigation";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  App.addListener('backButton', (data: BackButtonListenerEvent) => {
    router.back();
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}