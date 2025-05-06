import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateIncomeInput {
  @Field(() => Int)
  applicationId: number;

  @Field()
  nationalId: string;

  @Field()
  payorId: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  incomeType?: string;
}