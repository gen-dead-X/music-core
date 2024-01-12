import { Request, Response } from 'express';
import { UserLogin, UserRegister } from '@entities/user/user.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

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
    console.log({ username, email, password });
    console.log(ctx.req.body);

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
