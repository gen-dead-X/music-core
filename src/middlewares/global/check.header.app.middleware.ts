import { MiddlewareFn } from 'type-graphql';
import { Context } from '../../types/global.types';

const checkHeaderApp: MiddlewareFn<Context> = async (
  { context }: { context: Context },
  next
) => {
  try {
    if (
      context.req.headers.app !== 'admin' &&
      context.req.headers.app !== 'app'
    ) {
      throw new Error('Unauthorized!');
    }

    await next();
  } catch (error) {
    return error;
  }
};

export default checkHeaderApp;
