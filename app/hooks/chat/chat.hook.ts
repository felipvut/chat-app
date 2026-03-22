'use client';

import { Message } from '@/app/(auth)/chat/page';
import { ChatsService } from '@/app/services/chats.queries';
import { useMutation } from '@tanstack/react-query';


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