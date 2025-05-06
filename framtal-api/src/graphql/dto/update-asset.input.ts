import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAssetInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  nationalId?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  assetType?: string;

  @Field(() => String, { nullable: true })
  assetIdentifier?: string;
}