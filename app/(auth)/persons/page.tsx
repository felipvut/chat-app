'use client'

import { Box, Button, Card, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PersonsService } from "@/app/services/persons.queries";

export default function Persons() {
  const personsService = new PersonsService()
  const router = useRouter()

  const { data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => personsService.list().then(r => r),
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
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button sx={{ mb: 2 }} variant="contained" onClick={() => router.push('/home')}>Contatos</Button>
        </Box>
        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>Usuários</Typography>
        {
          isFetching &&
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 3 }}>Carregando...</Typography>
        }
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.data?.map((x: any) => (
            <Card key={x.uuid} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mb: 3 }}>
              <Typography color="textSecondary" key={x.uuid} sx={{ mb: 3 }}>{x.name}</Typography>
              <Button variant="contained">Entrar em contato</Button>
            </Card>
          ))
        }
      </Box>
    </Box>
  );
}
