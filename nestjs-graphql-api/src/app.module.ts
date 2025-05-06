import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { databaseConfig } from './config/database.config';
import { ApplicationModule } from './application/application.module';
import { EntityModule } from './entity/entity.module';
import { AssetModule } from './asset/asset.module';
import { DebtModule } from './debt/debt.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'),
      sortSchema: true,
      playground: true,
    }),
    ApplicationModule,
    EntityModule,
    AssetModule,
    DebtModule,
    IncomeModule,
  ],
})
export class AppModule {}