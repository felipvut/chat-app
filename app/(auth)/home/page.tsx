'use client'

import { Box, Button, ButtonBase, Divider, Fab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChatsService } from "@/app/services/chats.queries";
import Image from "next/image";
import { Add } from '@mui/icons-material';

export interface Chat {
  uuid?: string;
  name?: string;
  last_message?: string;
}

export default function Home() {
  const chatsService = new ChatsService()
  const router = useRouter()

  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => chatsService.myChats().then(r => r),
  })

  const logOut = () => {
    localStorage.setItem('@chat-app/token', '');
    router.push('/login');
  }

  return (
    <Box>
      <header style={{ background: '#1976d2', height: 55, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ ml: 2, color: '#fff' }}>Meu Perfil</Typography>
        <Button sx={{ mr: 1 }} color="error" variant="contained" onClick={logOut}>Sair</Button>
      </header>
      <Box sx={{ p: 2 }}>
        <Box className="add-contact">
          <Fab sx={{ mb: 2 }} variant="circular" color="primary" onClick={() => router.push('/persons')}>
            <Add></Add>
          </Fab>
        </Box>

        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>Meus Contatos</Typography>
        {
          isFetching &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3 }}>Carregando...</Typography>
        }
        {
          data?.data?.data?.map((chat: Chat) => (
            <Box key={chat.uuid}>
              <ButtonBase onClick={() => {
                localStorage.setItem('@chat-app/chat', chat?.uuid || '')
                router.push('/chat?uuid=' + chat?.uuid)
              }}
                sx={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'start', width: '100%',
                }}>
                <Box sx={{ display: 'flex', width: '100%', mb: 2, alignItems: 'center' }}>
                  <Box sx={{ mr: 2 }}>
                    <Image src="/user.png" width={55} height={55} alt={"Usuário"} style={{ marginRight: 3, borderRadius: '50%' }} />
                  </Box>
                  <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column',
                    alignItems: 'start'
                  }}>
                    <Typography color="textSecondary" sx={{ fontSize: 20, mb: 0.3 }}>{chat.name}</Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 17, mb: 1, p: 0, m: 0 }}>{chat?.last_message}</Typography>
                  </Box>
                </Box>
              </ButtonBase>
              <Divider color="#f8f8f8" sx={{ width: '100%', mb: 2 }} />
            </Box>
          ))
        }
      </Box>
    </Box >
  );
}
