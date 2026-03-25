import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  photo: z.any()
});

export type ProfileFormData = z.infer<typeof profileSchema>;