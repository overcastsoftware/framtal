import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity as TypeormEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Asset } from './asset.model';
import { Debt } from './debt.model';
import { Income } from './income.model';

@ObjectType()
@TypeormEntity({ name: 'entity' })
export class Entity {
  @Field(() => ID)
  @PrimaryColumn({ name: 'nationalId', length: 10 })
  nationalId: string;

  @Field()
  @PrimaryColumn({ name: 'familyNumber', length: 10 })
  familyNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  phone: string;

  @Field({ nullable: true })
  @Column({ name: 'postal_code', nullable: true, length: 255 })
  postalCode: string;

  @OneToMany(() => Asset, asset => asset.entity)
  assets: Asset[];

  @OneToMany(() => Debt, debt => debt.entity)
  debts: Debt[];

  @OneToMany(() => Income, income => income.entity)
  incomes: Income[];

  @OneToMany(() => Income, income => income.payor)
  paymentsIssued: Income[];
}