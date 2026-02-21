import { Box, Button, Link, TextField, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Box className="w-80" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color="primary" >Login</Typography>
        <TextField label="Login" />
        <TextField label="Senha" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" color="primary" fullWidth>Login</Button>
          <Button variant="contained" color="success" fullWidth>Criar Conta</Button>
        </Box>
      </Box>
    </div>
  );
}
