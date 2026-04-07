'use client'

import { Box, Button, Card, CircularProgress, IconButton, Link, Snackbar, SnackbarContent, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRegister } from "@/app/hooks/auth/auth.hook";
import { RegisterFormData, registerSchema } from "@/app/types/register.schema";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { LockOutline, PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material';

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useRegister();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterFormData) => {
    if (data.password != data.confirm_password) {
      setMessage('As senhas não coincidem');
      setOpen(true)
      return
    }
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.7, width: '100%', maxWidth: 400, p: 4,
          borderRadius: 4,
          textAlign: 'center'
        }}>
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
          Criar nova conta
        </Typography>
        <Typography variant="body2" color="textDisabled" sx={{ mb: 2 }}>
          Junte-se a nós e comece a conversar com seus amigos agora mesmo.
        </Typography>
        <TextField
          label="Nome Completo"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            startAdornment: (
              <PersonOutline color="action" sx={{ mr: 1 }} />
            ),
            sx: {
              borderRadius: 2,
              mb: 1
            }
          }}
        />
        <TextField
          label="Email"
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
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: (
              <LockOutline color="action" sx={{ mr: 1 }} />
            ),
            endAdornment: (
              <IconButton sx={{ m: 0, p: 0.3, ml: 1 }} onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <VisibilityOff color="action" /> : <Visibility color="action" />
                }
              </IconButton>
            ),
            sx: {
              borderRadius: 2,
              mb: 1
            }
          }}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          InputProps={{
            startAdornment: (
              <LockOutline color="action" sx={{ mr: 1 }} />
            ),
            endAdornment: (
              <IconButton sx={{ m: 0, p: 0.3, ml: 1 }} onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <VisibilityOff color="action" /> : <Visibility color="action" />
                }
              </IconButton>
            ),
            sx: {
              borderRadius: 2,
              mb: 1
            }
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained"
            type="submit"
            color="primary"
            size="large"
            disabled={isPending}
            sx={{ mb: 3, borderRadius: 2, textTransform: 'none', boxShadow: 3 }}
            fullWidth>
            {isPending ? <CircularProgress color="inherit" size={25} /> : 'Criar Conta'}
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Já tem uma conta?
            <Link href="/login" style={{ color: '#1d80e4', textDecoration: 'none', marginLeft: 4 }}>Faça o login</Link>
          </Typography>
        </Box>
      </Card>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={open}
        onClose={handleClose}
      >
        <SnackbarContent style={{
          backgroundColor: 'rgb(184, 62, 60)',
        }}
          message={message}
        >
        </SnackbarContent>
      </Snackbar>
    </div>
  );
}
