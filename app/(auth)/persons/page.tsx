'use client'

import { Box, Button, ButtonBase, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PersonsService } from "@/app/services/persons.queries";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import Header from "@/app/components/Header";
import { useNewChat } from "@/app/hooks/chat/chat.hook";
import { NewChat } from "@/app/services/chats.queries";

export interface Person {
  uuid?: string;
  name?: string;
}

export default function Persons() {
  const personsService = new PersonsService()
  const router = useRouter()

  const { mutate, isPending } = useNewChat();

  const { data, isFetching } = useQuery({
    queryKey: ['news-chats'],
    queryFn: () => personsService.listNewsChats().then(r => r),
  })

  const newChat = (data: NewChat) => {
    mutate(data);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ButtonBase sx={{ mr: 2 }} onClick={() => router.push('/home')}>
            <ArrowBackIcon sx={{ fontSize: '30px', color: '#5a5a5a' }}></ArrowBackIcon>
          </ButtonBase>
          <Typography variant="h4" color="primary">Adicionar chat</Typography>
        </Box>
        {
          isFetching || isPending &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>Carregando...</Typography>
        }
        {
          (!isFetching && !isPending) &&
          <>
            {
              data?.data?.data?.map((x: Person) => (
                <Card key={x.uuid} sx={{
                  display: 'flex',
                  flexDirection: 'column',

                  p: 3,
                  mb: 3,
                  borderRadius: '16px'
                }}>
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <Image src="/user.png" width={55} height={55} alt={"Usuário"}
                      style={{ marginRight: 3, borderRadius: '50%', marginBottom: '20px' }} />
                    <Typography color="textSecondary" key={x.uuid} sx={{ mb: 2.5 }}>{x.name}</Typography>
                  </Box>
                  <Button variant="contained" onClick={() => {
                    newChat({
                      persons_uuid: x.uuid
                    })
                  }}>Entrar em contato</Button>
                </Card>
              ))
            }
          </>
        }
      </Box>
    </Box>
  );
}
