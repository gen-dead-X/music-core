import { Request, Response } from 'express';
import { UserLogin, UserRegister } from '@entities/user/user.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserValidator from '@validators/user/user.validator';
import { ExceptionType } from '@enums/exception';
import CommonController from '@controllers/common/common.controllers';

const userValidator = new UserValidator();
const commonController = new CommonController();

@Resolver()
export class UserResolvers {
  @Query(() => String)
  async default() {
    return 'Register Query';
  }

  @Mutation(() => UserRegister)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: { req: Request; res: Response }
  ) {
    try {
      const isValid = userValidator.registerValidator(ctx.req);

      if (isValid instanceof Error) {
        return {
          type: ExceptionType.VALIDATION_ERROR,
          message: isValid.message,
          success: false,
        };
      }

      const newUser = commonController.register({
        name,
        email,
        password,
      });

      if (newUser instanceof Error) {
        return {
          type: 'Internal Server Error', // TODO: Change this to 'ExceptionType.INTERNAL_SERVER_ERROR
          message: newUser.message,
          success: false,
        };
      }

      return {
        message: 'User has been registered successfully!✅',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => UserLogin)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: { req: Request; res: Response }
  ) {
    console.log({ email, password });
    const isValid = userValidator.loginValidator(ctx.req);

    if (isValid instanceof Error) {
      return {
        type: ExceptionType.VALIDATION_ERROR,
        message: isValid.message,
        success: false,
      };
    }

    const result = await commonController.login({ email, password });

    console.log(result?.message);

    if (!result || result instanceof Error) {
      return {
        type: 'Internal Server Error', // TODO: Change this to 'ExceptionType.INTERNAL_SERVER_ERROR
        message: result?.message ?? 'User not found',
        success: false,
      };
    }

    return {
      data: result,
      message: `Hello ${result.data.user.username}`,
      success: true,
    };
  }
}
