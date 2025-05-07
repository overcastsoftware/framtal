import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from '../models/entity.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {}

  /**
   * Gets the currently logged in user
   * For this implementation, we'll always return the same user with ID 1203894569
   */
  async getCurrentUser(): Promise<Entity> {
    // Hard-coded user ID as specified in the requirements
    const nationalId = '1203894569';
    
    // Find and return the entity with the specified national ID
    return this.entityRepository.findOne({ where: { nationalId } });
  }
}