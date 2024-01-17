import { MiddlewareFn } from 'type-graphql';
import { Context } from '../../types/global.types';
import jwt from 'jsonwebtoken';
import config from '@config/config';

const validateToken: MiddlewareFn<Context> = async (
  { context }: { context: Context },
  next
) => {
  try {
    if (context.req.headers.authorization) {
      const [, token] = context.req.headers.authorization.split(' ');

      const isValidToken = jwt.verify(token, config.JWT_SECRET);

      if (isValidToken) {
        context.req.body.token = token;
        return await next();
      }
    }

    return new Error('Unauthorized!');
  } catch (error) {
    return error;
  }
};

export default validateToken;
