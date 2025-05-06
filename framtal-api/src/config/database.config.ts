import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as models from '../models';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'framtal',
  database: process.env.DATABASE_NAME || 'framtal',
  entities: Object.values(models),
  synchronize: false, // Set to false in production
  logging: process.env.NODE_ENV !== 'production',
};