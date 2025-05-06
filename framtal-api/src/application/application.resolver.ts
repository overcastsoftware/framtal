import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Application } from '../models/application.model';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @Query(() => [Application])
  async applications(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Query(() => Application, { nullable: true })
  async application(@Args('id', { type: () => Int }) id: number): Promise<Application> {
    return this.applicationService.findOne(id);
  }

  @Query(() => [Application])
  async applicationsByFamilyNumber(
    @Args('familyNumber') familyNumber: string,
  ): Promise<Application[]> {
    return this.applicationService.findByFamilyNumber(familyNumber);
  }
}