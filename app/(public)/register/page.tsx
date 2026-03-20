'use client'

import { Box, Button, Snackbar, SnackbarContent, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRegister } from "@/app/hooks/auth/auth.hook";
import { RegisterFormData, registerSchema } from "@/app/types/register.schema";

export default function Home() {
  const router = useRouter();

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
      <Box className="w-80"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" color="primary">Criar conta</Typography>
        <TextField
          label="Nome Completo"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          {...register('confirm_password')}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained"
            type="submit"
            color="primary"
            disabled={isPending}
            fullWidth>Criar Conta</Button>
          <Button variant="contained" color="success" fullWidth onClick={() => { router.push('/login') }}>Login</Button>
        </Box>
      </Box>
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
