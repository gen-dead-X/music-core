import { MiddlewareFn } from 'type-graphql';
import { Context, JWTCustomPayload } from '../../types/global.types';
import prisma from '@config/prisma.config';
import jwt from 'jsonwebtoken';

const validateIsAdmin: MiddlewareFn<Context> = async (
  { context }: { context: Context },
  next
) => {
  try {
    if (context.req.headers.app !== 'admin') {
      return new Error('Admin Authorization Failed!');
    }

    const decodedPayload = jwt.decode(context.req.body.token, {
      json: true,
    }) as JWTCustomPayload;

    const isAdmin = await prisma.user.findUnique({
      where: {
        id: decodedPayload.id,
      },
    });

    if (!isAdmin) {
      throw new Error('Admin Verification Failed!');
    }

    return await next();
  } catch (error) {
    return error;
  }
};

export default validateIsAdmin;
