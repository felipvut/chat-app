'use client';

import { Message } from '@/app/(auth)/chat/page';
import { ChatsService, NewChat } from '@/app/services/chats.queries';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';


const chatsService = new ChatsService();

export const useSendMessage = (onSuccessCallback?: () => void) => {

    return useMutation({
        mutationFn: (data: Message) => chatsService.sendMessage(data),
        onSuccess: (response) => {
            onSuccessCallback?.()
        },
        onError: (error) => {
            console.error('Erro ao enviar mensagem', error);
        }
    });
};

export const useNewChat = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: NewChat) => chatsService.newChat(data),
        onSuccess: (response) => {
            if (response?.data) {
                localStorage.setItem('@chat-app/chat', response?.data?.uuid || '')
                router.push('/chat?uuid=' + response?.data?.uuid)
            }
        },
        onError: (error) => {
            console.error('Erro ao criar chat', error);
        }
    });
};