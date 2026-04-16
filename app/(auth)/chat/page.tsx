'use client'

import { alpha, Box, Chip, CircularProgress, Fab, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatsService } from "@/app/services/chats.queries";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AuthService } from "@/app/services/auth.queries";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../globals.css";
import socket from "./socket";
import Header from "@/app/components/Header";
import { Camera, PhotoCamera, Send } from "@mui/icons-material";
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from "@capacitor/core";

export interface Message {
  uuid?: string;
  message?: string;
  chats_uuid?: string;
  is_author?: boolean
  author_uuid?: string;
}

type MessagesResponse = {
  data: Message[];
};

export default function Home() {
  const queryClient = useQueryClient();
  const chatsService = new ChatsService();
  const authService = new AuthService();
  const router = useRouter();
  const params = useSearchParams();
  const uuid = params.get('uuid');
  const ref = useRef(false);
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const { data: user } = useQuery({
    queryKey: ['user', typeof window !== "undefined" && window?.localStorage.getItem('@chat-app/token')],
    queryFn: () => authService.me().then(r => r),
  })

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    if (!socket.connected) {
      socket.connect();
    }

    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardDidShow', info => {
        const objDiv = document.getElementById("scroll");
        if (objDiv) {
          objDiv.scrollTop = objDiv?.scrollHeight;
        }
      });
    }
    if (!socket.hasListeners('receive_message')) {
      socket.on('receive_message', (newMessage: Message) => {
        queryClient.setQueryData<MessagesResponse>(['messages', uuid], (oldData) => {
          if (!oldData) return { data: [newMessage] };

          return {
            ...oldData,
            data: [...oldData.data, newMessage],
          };
        });

        const objDiv = document.getElementById("scroll");
        if (objDiv) {
          setTimeout(() => {
            objDiv.scrollTop = objDiv?.scrollHeight;
          }, 500)
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid])

  const sendMessage = () => {
    if (!message) return;
    socket.emit('send_message', {
      message,
      chats_uuid: uuid?.toString(),
      created_at: new Date(),
    });
    setMessage('');

    const objDiv = document.getElementById("scroll");
    if (objDiv) {
      setTimeout(() => {
        objDiv.scrollTop = objDiv?.scrollHeight;
      }, 500)
    }
  };

  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat' + uuid?.toString()],
    queryFn: () => chatsService.getChat(uuid?.toString() || '').then(r => r),
  })

  const { data: messagesData } = useQuery({
    queryKey: ['messages', uuid],
    queryFn: () => chatsService.getMessages(uuid?.toString() || '').then(r => r)
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messages = messagesData?.data ? messagesData?.data : []

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      const objDiv = document.getElementById("scroll");
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <Box sx={{ maxHeight: '100vh' }}>
      <Header callback={() => {
        socket.close()
        socket.off('receive_message')
      }} />
      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column', justifyContent: 'center',
          borderBottom: '1px solid #a9a9a9',
          p: 2,
          height: 88
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => {
                socket.close()
                socket.off('receive_message')
                router.back()
              }}
              sx={{
                mr: 2,
                width: 36,
                height: 36,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            {
              isLoading ? (
                <CircularProgress color="primary" size={24} sx={{ mr: 2 }}></CircularProgress>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '55px' }}>
                  <Image
                    className="img-photo"
                    unoptimized={true}
                    src={chat?.data?.files_uuid ? `${process.env.NEXT_PUBLIC_API_URL}/get-file/${chat?.data?.files_uuid}` : '/user.png'}
                    width={55} height={55} alt={"Usuário"} style={{ marginRight: 15, borderRadius: '50%' }} />
                  <Typography color="textSecondary" sx={{
                    fontSize: 20, mb: 0.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{chat?.data?.name}</Typography>
                </Box>
              )
            }
          </Box>
        </Box>
        {
          isLoading &&
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: 'calc(100vh - 200px)'
          }}>
            <CircularProgress color="primary"></CircularProgress>
          </Box>
        }
        <Box id="scroll" className="box-chat" sx={{ p: 2 }}>
          {
            !isLoading &&
            <>
              {
                messages?.map((message: Message) => (
                  <MessageComponent key={message.uuid} message={message} user={user} />
                ))
              }
            </>
          }
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, width: '100%', position: 'fixed', left: 0, bottom: 0, background: '#fff' }}>
          {
            message?.length === 0 &&
            <IconButton sx={{ mr: 2 }}>
              <PhotoCamera />
            </IconButton>
          }
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            maxRows={2}
            multiline
            name="message" placeholder="Digite sua mensagem..."
            InputProps={{
              sx: {
                borderRadius: 4,
              }
            }} />
          <Fab variant="circular" sx={{ ml: 2, minWidth: 56, minHeight: 56 }} color="primary" onClick={sendMessage}>
            <Send />
          </Fab>
          {/* <Button sx={{ ml: 2 }} onClick={sendMessage}>Enviar</Button> */}
        </Box>
      </Box>
    </Box >
  );
}

interface Props {
  message: Message;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}

export function MessageComponent({ message, user }: Props) {

  const messageMemo = useMemo(() => (
    <Box sx={{ textAlign: message?.author_uuid == user?.data?.person?.uuid ? 'right' : 'left', mb: 3 }}>
      <Chip label={message.message}
        color={message?.author_uuid == user?.data?.person?.uuid ? 'primary' : 'default'}
        sx={{
          height: 'auto',
          fontSize: 15,
          padding: 1,
          textAlign: 'justify',
          borderBottomLeftRadius: message?.author_uuid == user?.data?.person?.uuid ? '16px' : '0px',
          borderBottomRightRadius: message?.author_uuid == user?.data?.person?.uuid ? '0px' : '16px',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            maxWidth: '78vw'
          },
        }} />
    </Box>), [message?.author_uuid, message.message, user?.data?.person?.uuid]);

  return (
    <Box>
      {messageMemo}
    </Box>
  )
}

