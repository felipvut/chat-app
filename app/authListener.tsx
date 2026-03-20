'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      router.push('/login');
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [router]);

  return null;
}