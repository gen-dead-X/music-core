import { Request } from 'express';
import { UserLogin, UserRegister } from '@entities/user/user.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserValidator from '@validators/user/user.validator';
import { ExceptionType } from '@enums/exception';
import CommonController from '@controllers/common/common.controllers';
import { handleResolverError } from '@helpers/resolver.helpers';

const userValidator = new UserValidator();
const commonController = new CommonController();

@Resolver()
export class UserResolvers {
  @Query(() => String)
  async defaultUserQuery() {
    return 'User Resolver';
  }

  @Mutation(() => UserRegister)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('phoneNumber') phoneNumber: string,
    @Ctx() ctx: { req: Request }
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

      const newUser = await commonController.register({
        name,
        email,
        password,
        phoneNumber,
      });

      if (newUser instanceof Error) {
        throw new Error(newUser.message);
      }

      return {
        message: 'User has been registered successfully!✅',
        success: true,
      };
    } catch (error) {
      return handleResolverError(error);
    }
  }

  @Mutation(() => UserLogin)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: { req: Request }
  ) {
    try {
      const isValid = userValidator.loginValidator(ctx.req);

      if (isValid instanceof Error) {
        throw new Error(isValid.message);
      }

      const result = await commonController.login({ email, password });

      if (!result || result instanceof Error) {
        throw new Error(result?.message ?? 'User not found');
      }

      return {
        data: result,
        message: `Hello ${result.user.name}`,
        success: true,
      };
    } catch (error) {
      return handleResolverError(error);
    }
  }
}
