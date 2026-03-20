import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirm_password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;