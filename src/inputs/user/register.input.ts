import { InputType, Field } from 'type-graphql';
import { Register } from 'types/user/user.type';

@InputType()
export class RegisterInput implements Partial<Register> {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
