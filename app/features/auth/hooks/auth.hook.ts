/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../services/auth.queries';
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
    return useMutation({
        mutationFn: (data: any) => authService.register(data),
        onSuccess: (response: any) => {
        },
        onError: (error) => {
            console.error('Erro no login', error);
        }
    });
};