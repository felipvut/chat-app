/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AuthService } from '@/app/services/auth.queries';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

const authService = new AuthService();

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: any) => authService.login(data),
        onSuccess: (response) => {
            if (response?.token) {
                localStorage.setItem('@chat-app/token', response?.token);
                router.push('/home');
            }
        },
        onError: (error) => {
            console.error('Erro no login', error);
        }
    });
};

export const useRegister = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: any) => authService.register(data),
        onSuccess: (response: any) => {
            router.push('/login');
        },
        onError: (error) => {
            console.error('Erro ao criar conta', error);
        }
    });
};