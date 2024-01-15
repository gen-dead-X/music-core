import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserRegister {
  @Field(() => String)
  message!: string;

  @Field(() => Boolean)
  success!: boolean;
}

@ObjectType()
export class UserData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;
}

@ObjectType()
class User {
  @Field(() => UserData)
  user!: UserData;

  @Field(() => String)
  accessToken!: string;

  @Field(() => String)
  refreshToken!: string;
}

@ObjectType()
export class UserLogin {
  @Field(() => User, { nullable: true })
  data?: User;

  @Field(() => String)
  message!: string;

  @Field(() => Boolean)
  success!: boolean;
}

@ObjectType()
export class AllUserDetails {
  @Field(() => [UserData])
  data?: Array<UserData>;

  @Field(() => String)
  message!: string;

  @Field(() => Boolean)
  success!: boolean;
}
