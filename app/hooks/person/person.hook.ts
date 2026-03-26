'use client';

import { AuthService } from '@/app/services/auth.queries';
import { ProfileFormData } from '@/app/types/profile.schema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';


const authService = new AuthService();

export const useSaveProfile = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ProfileFormData) => authService.saveProfile(data),
        onSuccess: (response) => {
            if (response?.data) {
                router.push('/home')
            }
        },
        onError: (error) => {
            console.error('Erro ao criar chat', error);
        }
    });
};