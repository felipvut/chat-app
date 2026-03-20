'use client'

import { Box, Button, ButtonBase, Chip, Divider, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChatsService } from "@/app/services/chats.queries";
import Image from "next/image";

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
    <Box className="container">
      <header style={{ background: '#1976d2', height: 55, padding: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ ml: 2, color: '#fff' }}>Meu Perfil</Typography>
        <Button sx={{ mr: 1 }} color="error" variant="contained" onClick={logOut}>Sair</Button>
      </header>
      <Box sx={{ p: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/user.png" width={55} height={55} alt={"Usuário"} style={{ marginRight: 15, borderRadius: '50%' }} />
              <Typography color="textSecondary" sx={{ fontSize: 20, mb: 0.3 }}>Matheus</Typography>
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
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Chip label='Isso é um teste'
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
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Chip color="info"
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
              }}
              label='Bom dia Família Linda e 
Abençoada de Jesus

Isaías 25.1 | ARA
1 Ó Senhor, tu és o meu Deus; exaltar-te-ei e louvarei o teu nome, porque fizeste maravilhas; os teus conselhos antigos são verdade e firmeza. 

Enquanto há muitas coisas pelas quais podemos louvar a Deus, uma das mais significativas é Sua fidelidade em fazer tudo o que prometeu. Somos grandes sonhadores, mas somente Deus pode realizar Seus planos.

Hoje tem GF no Apolo🙏🏻
Deus Abençoe 
Graça e Paz' />
          </Box>
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Chip label='Isso é um teste'
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
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Chip color="info"
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
              }}
              label='Bom dia Família Linda e 
Abençoada de Jesus

Isaías 25.1 | ARA
1 Ó Senhor, tu és o meu Deus; exaltar-te-ei e louvarei o teu nome, porque fizeste maravilhas; os teus conselhos antigos são verdade e firmeza. 

Enquanto há muitas coisas pelas quais podemos louvar a Deus, uma das mais significativas é Sua fidelidade em fazer tudo o que prometeu. Somos grandes sonhadores, mas somente Deus pode realizar Seus planos.

Hoje tem GF no Apolo🙏🏻
Deus Abençoe 
Graça e Paz' />
          </Box>
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Chip label='Isso é um teste'
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
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <Chip color="info"
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
              }}
              label='Bom dia Família Linda e 
Abençoada de Jesus

Isaías 25.1 | ARA
1 Ó Senhor, tu és o meu Deus; exaltar-te-ei e louvarei o teu nome, porque fizeste maravilhas; os teus conselhos antigos são verdade e firmeza. 

Enquanto há muitas coisas pelas quais podemos louvar a Deus, uma das mais significativas é Sua fidelidade em fazer tudo o que prometeu. Somos grandes sonhadores, mas somente Deus pode realizar Seus planos.

Hoje tem GF no Apolo🙏🏻
Deus Abençoe 
Graça e Paz' />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', p: 1, width: '100%', position: 'fixed', left: 0, bottom: 0, zIndex: 999999999999, background: '#fff' }}>
          <TextField name="message" placeholder="Digite sua mensagem..." fullWidth />
          <Button sx={{ ml: 2 }}>Enviar</Button>
        </Box>
      </Box>
    </Box >
  );
}
