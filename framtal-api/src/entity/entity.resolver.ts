import { Resolver, Query, Args } from '@nestjs/graphql';
import { EntityService } from './entity.service';
import { Entity } from '../models/entity.model';

@Resolver(() => Entity)
export class EntityResolver {
  constructor(private entityService: EntityService) {}

  @Query(() => [Entity])
  async entities(): Promise<Entity[]> {
    return this.entityService.findAll();
  }

  @Query(() => Entity, { nullable: true })
  async entity(@Args('nationalId') nationalId: string): Promise<Entity> {
    return this.entityService.findOne(nationalId);
  }

  @Query(() => [Entity])
  async entitiesByFamily(
    @Args('familyNumber') familyNumber: string,
  ): Promise<Entity[]> {
    return this.entityService.findByFamilyNumber(familyNumber);
  }
}