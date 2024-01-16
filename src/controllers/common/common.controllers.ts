import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import prisma from '@config/prisma.config';
import config from '@config/config';
import { ExceptionType } from '@enums/exception';
import {
  Login,
  RegisterInput,
  UserLogin,
} from '../../types/controllers/common.controller.types';
import { JWTCustomPayload } from '../../types/global.types';

async function generateToken({ id }: JWTCustomPayload) {
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
  async register({
    name,
    email,
    password,
    phoneNumber,
  }: RegisterInput): Promise<undefined | Error> {
    try {
      const hashedPass = await bcrypt.hash(
        password,
        parseInt(config.SALT_VALUE ?? '10')
      );

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPass,
          phoneNumber,
        },
      });

      if (!newUser) {
        throw new Error('User not created');
      }
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      return new Error(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async login({ email, password }: Login): Promise<UserLogin | Error> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const doesPasswordMatches = await bcrypt.compare(password, user.password);

      if (!doesPasswordMatches) {
        throw new Error('Incorrect password');
      }

      const token = await generateToken({ id: user.id });

      return {
        user,
        ...token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      return new Error(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
