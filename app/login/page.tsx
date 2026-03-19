'use client'

import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useLogin } from "../features/auth/hooks/auth.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "../features/auth/schemas/login.schema";

export default function Home() {
  const router = useRouter();

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-80"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" color="primary">
          Login
        </Typography>

        {isError && (
          <Alert severity="error">
            Email ou senha inválidos
          </Alert>
        )}

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            sx={{ mb: 1 }}
            type="submit"
            color="success"
            variant="contained"
            fullWidth
            disabled={isPending}
          >
            {isPending ? 'Entrando...' : 'Login'}
          </Button>
          <Button variant="contained" onClick={() => {router.push('/register')}}>
            Criar conta
          </Button>
        </Box>
      </Box>
    </div>
  );
}