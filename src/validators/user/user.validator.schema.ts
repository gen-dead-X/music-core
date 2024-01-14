import regex from '@enums/regex';
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().required().matches(regex.EMAIL),
  password: yup.string().min(8).required().matches(regex.PASSWORD),
  name: yup.string().min(3).required().matches(regex.USERNAME),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
