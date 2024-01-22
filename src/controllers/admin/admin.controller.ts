import prisma from '@config/prisma.config';
import { User } from '@prisma/client';
import { ExceptionType } from '@enums/exception';

export default class AdminController {
  async getAllUsers(): Promise<Array<User> | Error> {
    try {
      const allUsers = await prisma.user.findMany();

      if (!allUsers.length || !allUsers) {
        return new Error(ExceptionType.NOT_FOUND);
      }

      return [...allUsers];
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      return new Error(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadTrack(data) {
    try {
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }

      return new Error(ExceptionType.INTERNAL_SERVER_ERROR);
    }
  }
}
