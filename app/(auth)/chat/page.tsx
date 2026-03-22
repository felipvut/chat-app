'use client'

import { Box, Button, Chip, Divider, TextField, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatsService } from "@/app/services/chats.queries";
import Image from "next/image";
import { useSendMessage } from "@/app/hooks/chat/chat.hook";
import { useState } from "react";

export interface Message {
  uuid?: string;
  message?: string;
  chats_uuid?: string;
  is_author?: boolean
}

export default function Home() {
  const queryClient = useQueryClient();
  const chatsService = new ChatsService();
  const router = useRouter();
  const params = useSearchParams();
  const uuid = params.get('uuid');
  const [message, setMessage] = useState('');

  const { data: chat, isFetching } = useQuery({
    queryKey: ['chat'],
    queryFn: () => chatsService.getChat(uuid?.toString() || '').then(r => r),
  })

  const { data: messagesData } = useQuery({
    queryKey: ['messages', uuid],
    queryFn: () => chatsService.getMessages(uuid?.toString() || '').then(r => r),
    refetchInterval: 10000
  })

  const logOut = () => {
    localStorage.setItem('@chat-app/token', '');
    router.push('/login');
  }

  const { mutate } = useSendMessage(() => {
    setMessage('');
    queryClient.invalidateQueries({
      queryKey: ['messages', uuid],
    });
  });

  const sendMessage = () => {
    if (!uuid?.toString() || '') return
    if (!message) return

    mutate({
      chats_uuid: uuid?.toString() || '',
      message
    })
  }

  const messages = messagesData?.data ? messagesData?.data : []

  return (
    <Box>
      <header style={{ background: '#1976d2', height: 55, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ ml: 2, color: '#fff' }}>Meu Perfil</Typography>
        <Button sx={{ mr: 1 }} color="error" variant="contained" onClick={logOut}>Sair</Button>
      </header>
      <Box sx={{ p: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/user.png" width={55} height={55} alt={"Usuário"} style={{ marginRight: 15, borderRadius: '50%' }} />
              <Typography color="textSecondary" sx={{ fontSize: 20, mb: 0.3 }}>{chat?.data?.name}</Typography>
            </Box>
            <Button sx={{ mb: 2 }} variant="contained" onClick={() => router.back}>Voltar</Button>
          </Box>
          <Divider color="#f8f8f8" sx={{ width: '100%', mb: 2 }} />

        </Box>
        {
          isFetching &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3 }}>Carregando...</Typography>
        }
        <Box sx={{ height: 'calc(100vh - 68px - 55px - 16px - 90px)' }}>
          {
            messages?.map((message: Message) => (
              <Box key={message.uuid} sx={{ textAlign: message?.is_author ? 'right' : 'left', mb: 3 }}>
                <Chip label={message.message}
                  color={message?.is_author ? 'primary' : 'default'}
                  sx={{
                    height: 'auto',
                    fontSize: 15,
                    padding: 1,
                    textAlign: 'justify',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                      overflowWrap: 'break-word',
                      maxWidth: '78vw'
                    },
                  }} />
              </Box>
            ))
          }
        </Box>
        <Box sx={{ display: 'flex', p: 1, width: '100%', position: 'fixed', left: 0, bottom: 0, zIndex: 999999999999, background: '#fff' }}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message" placeholder="Digite sua mensagem..." fullWidth />
          <Button sx={{ ml: 2 }} onClick={sendMessage}>Enviar</Button>
        </Box>
      </Box>
    </Box >
  );
}
