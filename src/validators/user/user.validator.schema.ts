import regex from '@enums/regex';
import { z as zod } from 'zod';

export const registerSchema = zod.object({
  email: zod.string().refine(data => regex.EMAIL.test(data)),
  password: zod
    .string()
    .min(8)
    .refine(data => regex.PASSWORD.test(data)),
  name: zod.string().min(3),
  phoneNumber: zod.string().length(10).regex(regex.PHONE_NUMBER),
});

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
