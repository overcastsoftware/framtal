import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { Asset } from '../models/asset.model';
import { UpdateAssetInput } from '../graphql/dto/update-asset.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private assetService: AssetService) {}

  @Query(() => [Asset])
  async assets(): Promise<Asset[]> {
    return this.assetService.findAll();
  }

  @Query(() => Asset, { nullable: true })
  async asset(@Args('id', { type: () => Int }) id: number): Promise<Asset> {
    return this.assetService.findOne(id);
  }

  @Query(() => [Asset])
  async assetsByApplication(
    @Args('applicationId', { type: () => Int }) applicationId: number,
  ): Promise<Asset[]> {
    return this.assetService.findByApplicationId(applicationId);
  }

  @Query(() => [Asset])
  async assetsByNationalId(
    @Args('nationalId') nationalId: string,
  ): Promise<Asset[]> {
    return this.assetService.findByNationalId(nationalId);
  }

  @Mutation(() => Asset)
  async updateAsset(
    @Args('updateAssetInput') updateAssetInput: UpdateAssetInput,
  ): Promise<Asset> {
    return this.assetService.update(updateAssetInput);
  }
}