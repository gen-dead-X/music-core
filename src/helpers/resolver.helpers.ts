import { ExceptionType } from '@enums/exception';

export function handleResolverError(error: Error | unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      success: false,
    };
  }

  return {
    message: ExceptionType.INTERNAL_SERVER_ERROR,
    success: false,
  };
}
