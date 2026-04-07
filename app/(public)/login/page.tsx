'use client'

import { Box, Button, TextField, Typography, Alert, Card, IconButton, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLogin } from "@/app/hooks/auth/auth.hook";
import { LoginFormData, loginSchema } from "@/app/types/login.schema";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Link from "next/link";

export default function Home() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans"
      style={{ backgroundColor: 'background.default' }}>
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1, width: '100%', maxWidth: 400, p: 4,
          borderRadius: 4,
          textAlign: 'center'
        }}
      >
        <Box>
          <Box sx={{
            mb: 1,
            color: '#fff', background: '#1d80e4', width: 52, height: 52,
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
          }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 30 }} />
          </Box>
        </Box>
        <Typography variant="h5" color="textPrimary" sx={{ m: 0, p: 0 }}>
          Bem-vindo de volta
        </Typography>
        <Typography variant="body2" color="textDisabled" sx={{ mb: 2 }}>
          Faça login para continuar conectado com seus contatos.
        </Typography>
        {isError && (
          <Alert severity="error">
            Email ou senha inválidos
          </Alert>
        )}

        <TextField
          label="Email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: (
              <MailOutlineIcon color="action" sx={{ mr: 1 }} />
            ),
            sx: {
              borderRadius: 2,
              mb: 1
            }
          }}
        />

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <LockOutlineIcon color="action" sx={{ mr: 1 }} />
            ),
            endAdornment: (
              <IconButton sx={{ m: 0, p: 0.3, ml: 1 }} onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <VisibilityOffIcon color="action" /> : <VisibilityIcon color="action" />
                }
              </IconButton>
            ),
            sx: {
              borderRadius: 2
            }
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            sx={{ mb: 4, borderRadius: 2, textTransform: 'none', boxShadow: 3 }}
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            fullWidth
            disabled={isPending}
          >
            {isPending ? <CircularProgress color="inherit" size={25} /> : 'Entrar na Conta'}
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
            Não tem uma conta?
            <Link href="/register" style={{ color: '#1d80e4', textDecoration: 'none', marginLeft: 4 }}>Criar uma aqui</Link>
          </Typography>
        </Box>
      </Card>
    </div>
  );
}