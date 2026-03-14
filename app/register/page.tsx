'use client'

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Box className="w-80" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color="primary">Criar conta</Typography>
        <TextField label="Nome Completo" size="small" />
        <TextField label="Email" size="small" />
        <TextField label="Senha" size="small" type="password" />
        <TextField label="Confirmar Senha" size="small" type="password" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" color="primary" fullWidth>Criar Conta</Button>
          <Button variant="contained" color="success" fullWidth onClick={() => { router.push('/') }}>Login</Button>
        </Box>
      </Box>
    </div>
  );
}
