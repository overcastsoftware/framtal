import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../models/asset.model';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  providers: [AssetService, AssetResolver],
  exports: [AssetService],
})
export class AssetModule {}