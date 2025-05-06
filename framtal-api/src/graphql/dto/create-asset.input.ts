import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAssetInput {
  @Field(() => Int)
  applicationId: number;

  @Field()
  nationalId: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  assetType?: string;

  @Field(() => String, { nullable: true })
  assetIdentifier?: string;
}