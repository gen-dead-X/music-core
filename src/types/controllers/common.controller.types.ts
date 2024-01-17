import { User } from '@prisma/client';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type Login = {
  email: string;
  password: string;
};
export type UserLogin = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
