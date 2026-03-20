'use client';

import { AuthService } from '@/app/services/auth.queries';
import { Login, Register as RegisterType } from '@/app/services/types/auth';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

const authService = new AuthService();

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: Login) => authService.login(data),
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
        mutationFn: (data: RegisterType) => authService.register(data),
        onSuccess: () => {
            router.push('/login');
        },
        onError: (error) => {
            console.error('Erro ao criar conta', error);
        }
    });
};