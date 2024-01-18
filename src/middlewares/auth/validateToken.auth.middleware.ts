import { MiddlewareFn } from 'type-graphql';
import { Context, JWTCustomPayload } from '../../types/global.types';
import jwt from 'jsonwebtoken';
import config from '@config/config';
import prisma from '@config/prisma.config';
import { USER_TYPE } from '@enums/global.enum';

const validateToken: MiddlewareFn<Context> = async (
  { context }: { context: Context },
  next
) => {
  try {
    const requestFromApp = context.req.headers.app === 'app';
    const requestFromAdmin = context.req.headers.app === 'admin';

    if (context.req.headers.authorization) {
      const [, token] = context.req.headers.authorization.split(' ');

      const isValidToken = jwt.verify(
        token,
        config.JWT_SECRET
      ) as JWTCustomPayload;

      const user = await prisma.user.findUnique({
        where: { id: isValidToken.id },
      });

      if (!user) {
        throw new Error('User Not Found!');
      }

      if (user.userType === USER_TYPE.USER && !requestFromApp) {
        throw new Error('Unauthorized');
      }

      if (
        user.userType !== USER_TYPE.ADMIN &&
        user.userType !== USER_TYPE.STAFF &&
        user.userType !== USER_TYPE.ARTIST &&
        requestFromAdmin
      ) {
        throw new Error('Unauthorized');
      }

      if (isValidToken) {
        context.req.body.token = token;
        context.req.body.userDetails = user;
        return await next();
      }
    }

    throw new Error('Unauthorized!');
  } catch (error) {
    return error;
  }
};

export default validateToken;
