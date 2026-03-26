'use client';

import { ChatsService, NewChat } from '@/app/services/chats.queries';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';


const chatsService = new ChatsService();

export const useNewChat = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: NewChat) => chatsService.newChat(data),
        onSuccess: (response) => {
            if (response?.data) {
                typeof window !== "undefined" && window?.localStorage .setItem('@chat-app/chat', response?.data?.uuid || '')
                router.push('/chat?uuid=' + response?.data?.uuid)
            }
        },
        onError: (error) => {
            console.error('Erro ao criar chat', error);
        }
    });
};