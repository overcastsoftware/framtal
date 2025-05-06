import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asset } from './asset.model';
import { Debt } from './debt.model';
import { Income } from './income.model';

@ObjectType()
@Entity({ name: 'application' })
export class Application {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column({ name: 'familyNumber', length: 10 })
  familyNumber: string;

  @Field()
  @Column({ length: 4 })
  year: string;

  @Field(() => [Asset], { nullable: true })
  @OneToMany(() => Asset, asset => asset.application)
  assets?: Asset[];

  @Field(() => [Debt], { nullable: true })
  @OneToMany(() => Debt, debt => debt.application)
  debts?: Debt[];

  @Field(() => [Income], { nullable: true })
  @OneToMany(() => Income, income => income.application)
  incomes?: Income[];
}