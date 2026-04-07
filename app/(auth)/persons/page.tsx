'use client'

import { alpha, Box, Button, ButtonBase, Card, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PersonsService } from "@/app/services/persons.queries";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import Header from "@/app/components/Header";
import { useNewChat } from "@/app/hooks/chat/chat.hook";
import { NewChat } from "@/app/services/chats.queries";
import { ChatBubbleOutline, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Chat } from "../home/page";

export interface Person {
  uuid?: string;
  name?: string;
  files_uuid?: string;
}

export default function Persons() {
  const personsService = new PersonsService()
  const router = useRouter()
  const theme = useTheme();

  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  const { mutate, isPending } = useNewChat();

  const { data, isFetching } = useQuery({
    queryKey: ['news-chats'],
    queryFn: () => personsService.listNewsChats().then(r => r),
  })

  const newChat = (data: NewChat) => {
    mutate(data);
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={() => router.push('/home')}
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
          <Typography variant="h5" color="textPrimary">Novo Contato</Typography>
        </Box>
        {
          isFetching || isPending &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>Carregando...</Typography>
        }
        {
          (!isFetching && !isPending) &&
          <>
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
              filteredChats?.map((person: Person) => (
                <ButtonBase key={person?.uuid} onClick={() => {
                  newChat({
                    persons_uuid: person.uuid
                  })
                }}
                  sx={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'center', width: '100%',
                    border: '1px solid #dbdbdb', borderRadius: 4, p: 1.6, mb: 2
                  }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                    <Box sx={{ mr: 1.5, minWidth: '55px' }}>
                      <Image
                        className="img-photo"
                        unoptimized={true}
                        src={person?.files_uuid ? `${process.env.NEXT_PUBLIC_API_URL}/get-file/${person?.files_uuid}` : '/user.png'}
                        width={55} height={55} alt={"Usuário"} style={{ marginRight: 3, borderRadius: '50%' }} />
                    </Box>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'start'
                    }}>
                      <Typography
                        color="textPrimary"
                        sx={{ fontSize: 20, mb: 0.3, fontWeight: 700 }}>{person?.name}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main', minWidth: 45, minHeight: 45,
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
                  }}>
                    <ChatBubbleOutline sx={{ fontSize: 28 }} />
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
          </>
        }
      </Box>
    </Box>
  );
}
