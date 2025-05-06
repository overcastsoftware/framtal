import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  nationalId?: string;

  @Field(() => String, { nullable: true })
  payorId?: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  incomeType?: string;
}