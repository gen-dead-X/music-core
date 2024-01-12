import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserRegister {
  @Field(() => String)
  message!: string;

  @Field(() => Boolean)
  success!: boolean;
}

@ObjectType()
export class LoginData {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  password!: string;
}

@ObjectType()
export class UserLogin {
  @Field(() => LoginData, { nullable: true })
  data?: LoginData;

  @Field(() => String)
  message!: string;

  @Field(() => Boolean)
  success!: boolean;
}
