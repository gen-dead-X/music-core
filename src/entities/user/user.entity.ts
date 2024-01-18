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

  @Field(() => String)
  userType!: string;

  @Field(() => String, { nullable: true }) // Age is optional, adjust as needed
  age?: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  gender?: string;
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

@ObjectType()
export class UserProfile {
  @Field(() => UserData, { nullable: true })
  data?: UserData;

  @Field(() => String)
  message?: string;

  @Field(() => Boolean)
  success!: boolean;
}
