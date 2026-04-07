'use client'

import { Box, ButtonBase, CircularProgress, Fab, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChatsService } from "@/app/services/chats.queries";
import Image from "next/image";
import { Add, Search } from '@mui/icons-material';
import Header from "@/app/components/Header";
import "../../globals.css";
import { useEffect, useState } from "react";

export interface Chat {
  uuid?: string;
  name?: string;
  last_message?: string;
  files_uuid?: string;
}

export default function Home() {
  const chatsService = new ChatsService()
  const router = useRouter()

  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => chatsService.myChats().then(r => r),
  })
  
  useEffect(() => {
    if (data?.data?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredChats(data.data.data);
    }
  }, [data])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (data?.data?.data) {
      const filtered = data.data.data.filter((chat: Chat) =>
        chat.name?.toLowerCase().includes(searchTerm)
      );
      setFilteredChats(filtered);
    }
  };

  return (
    <Box>
      <Header />
      <Box sx={{ p: 2 }}>
        <Box className="add-contact">
          <Fab sx={{ mb: 2, background: '#0d47a1' }} variant="circular" color="primary" onClick={() => router.push('/persons')}>
            <Add></Add>
          </Fab>
        </Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>Contatos</Typography>
        {
          isLoading &&
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: 'calc(100vh - 200px)'
          }}>
            <CircularProgress color="primary"></CircularProgress>
          </Box>
        }
        {
          !isLoading &&
          <Box>
            <TextField
              onChange={handleSearch}
              placeholder="Buscar contatos..."
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <Search color="action" sx={{ mr: 1 }} />
                ),
                sx: {
                  borderRadius: 4,
                  mb: 4
                }
              }}
            />
            {
              filteredChats?.map((chat: Chat) => (
                <ButtonBase key={chat?.uuid} onClick={() => {
                  typeof window !== "undefined" && window?.localStorage?.setItem('@chat-app/chat', chat?.uuid || '')
                  router.push('/chat?uuid=' + chat?.uuid)
                }}
                  sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'start', width: '100%',
                    border: '1px solid #dbdbdb', borderRadius: 4, p: 1.6, mb: 2
                  }}>
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <Box sx={{ mr: 1.5, minWidth: '55px' }}>
                      <Image
                        className="img-photo"
                        unoptimized={true}
                        src={chat?.files_uuid ? `${process.env.NEXT_PUBLIC_API_URL}/get-file/${chat?.files_uuid}` : '/user.png'}
                        width={55} height={55} alt={"Usuário"} style={{ marginRight: 3, borderRadius: '50%' }} />
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'start'
                    }}>
                      <Typography
                        color="textPrimary"
                        sx={{ fontSize: 20, mb: 0.3, fontWeight: 700 }}>{chat?.name?.split(' ')?.[0]}</Typography>
                      <Typography className="overflow-text" color="textSecondary" sx={{ fontSize: 17, p: 0, m: 0 }}>{chat?.last_message}</Typography>
                    </Box>
                  </Box>
                </ButtonBase>
              ))
            }
            {
              filteredChats?.length === 0 && (
                <Typography variant="subtitle1" sx={{ p: 2, m: 0, fontWeight: 500, textAlign: 'center' }}>
                  Nenhum contato foi encontrado.
                </Typography>
              )
            }
          </Box>
        }
      </Box>
    </Box >
  );
}
