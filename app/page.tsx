'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" && window?.localStorage .getItem('@chat-app/token');

    if (token) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}