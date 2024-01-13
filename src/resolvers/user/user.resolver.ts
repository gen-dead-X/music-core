import { Request, Response } from 'express';
import { UserLogin, UserRegister } from '@entities/user/user.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserValidator from '@validators/user/user.validator';
import { ExceptionType } from '@enums/exception';

const userValidator = new UserValidator();

@Resolver()
export class UserResolvers {
  @Query(() => String)
  async default() {
    return 'Register Query';
  }

  @Mutation(() => UserRegister)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: { req: Request; res: Response }
  ) {
    const isValid = await userValidator.registerValidator(ctx.req);

    if (isValid instanceof Error) {
      return {
        type: ExceptionType.VALIDATION_ERROR,
        message: isValid.message,
        success: false,
      };
    }

    return {
      message: 'Hello',
      success: true,
    };
  }

  @Mutation(() => UserLogin)
  async login(@Arg('email') email: string, @Arg('password') password: string) {
    console.log({ email, password });
    const data = {
      id: 'something',
      username: 'Joy',
      email: 'a@b.com',
    };

    return {
      data,
      message: `Hello ${data.username}`,
      success: true,
    };
  }
}
