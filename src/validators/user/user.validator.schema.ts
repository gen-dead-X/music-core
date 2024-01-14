import regex from '@enums/regex';
import { z as zod } from 'zod';

export const registerSchema = zod.object({
  email: zod.string().refine(data => regex.EMAIL.test(data)),
  password: zod
    .string()
    .min(8)
    .refine(data => regex.PASSWORD.test(data)),
  name: zod.string().min(3),
});

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
