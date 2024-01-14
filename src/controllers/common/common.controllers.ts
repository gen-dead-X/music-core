import jwt from 'jsonwebtoken';

import prisma from '@config/prisma.config';
import config from '@config/config';
import { User } from '@prisma/client';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
type Login = {
  email: string;
  password: string;
};
type UserLogin = {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  success: boolean;
  message: string;
};

async function generateToken({ id }: { id: string }) {
  const accessToken = jwt.sign(
    { id },
    config.JWT_SECRET ?? Math.random().toString()
  );
  const refreshToken = jwt.sign(
    { id },
    config.JWT_SECRET_REFRESH ?? Math.random().toString()
  );

  return {
    accessToken,
    refreshToken,
  };
}

export default class CommonController {
  async register({ name, email, password }: RegisterInput) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      if (!newUser) {
        throw new Error('User not created');
      }
    } catch (error) {
      return error;
    }
  }

  async login({
    email,
    password,
  }: Login): Promise<UserLogin | Error | undefined> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Incorrect password');
      }

      const token = await generateToken({ id: user.id });

      return {
        data: { user, ...token },
        success: true,
        message: 'User has been logged in successfully!✅',
      };
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }
}
