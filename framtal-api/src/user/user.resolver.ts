import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Entity } from '../models/entity.model';

@Resolver(() => Entity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * GraphQL query to get the currently authenticated user
   * For this implementation, it will always return the same user
   */
  @Query(() => Entity, { name: 'currentUser', nullable: true })
  async getCurrentUser(): Promise<Entity> {
    return this.userService.getCurrentUser();
  }
}