import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.string().email('Formato de email inválido.'),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres.'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
  passwordConfirmation: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'A confirmação de senha deve ser igual à senha.',
  path: ['passwordConfirmation'],
});

export const loginSchema = z.object({
  email: z.string().email('Formato de email inválido.'),
  password: z.string(),
});
