import prisma from '@config/prisma.config';

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

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
}
