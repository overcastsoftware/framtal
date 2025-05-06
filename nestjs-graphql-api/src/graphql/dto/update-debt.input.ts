import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDebtInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  nationalId?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  descriptionSecondary?: string;

  @Field(() => String, { nullable: true })
  loanType?: string;

  @Field(() => String, { nullable: true })
  lenderId?: string;

  @Field(() => String, { nullable: true })
  loanNumber?: string;

  @Field(() => Date, { nullable: true })
  loanDate?: Date;

  @Field(() => String, { nullable: true })
  loanLength?: string;

  @Field(() => Int, { nullable: true })
  totalPayment?: number;

  @Field(() => Int, { nullable: true })
  principalPayment?: number;

  @Field(() => Int, { nullable: true })
  deduction?: number;

  @Field(() => Int, { nullable: true })
  totalCost?: number;

  @Field(() => Int, { nullable: true })
  amount?: number;
}