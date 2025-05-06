import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from './application.model';
import { Entity as EntityModel } from './entity.model';

@ObjectType()
@Entity({ name: 'debt' })
export class Debt {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'applicationId', type: 'bigint' })
  applicationId: number;

  @Field()
  @Column({ name: 'nationalId', length: 10 })
  nationalId: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 255 })
  description: string;

  @Field({ nullable: true })
  @Column({ name: 'description_secondary', nullable: true, length: 255 })
  descriptionSecondary: string;

  @Field({ nullable: true })
  @Column({ name: 'loanType', nullable: true, length: 255 })
  loanType: string;

  @Field({ nullable: true })
  @Column({ name: 'lenderId', nullable: true, length: 10 })
  lenderId: string;

  @Field({ nullable: true })
  @Column({ name: 'loanNumber', nullable: true, length: 255 })
  loanNumber: string;

  @Field({ nullable: true })
  @Column({ name: 'loanDate', nullable: true, type: 'date' })
  loanDate: Date;

  @Field({ nullable: true })
  @Column({ name: 'loanLength', nullable: true, length: 255 })
  loanLength: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'totalPayment', nullable: true, type: 'integer' })
  totalPayment: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'principalPayment', nullable: true, type: 'integer' })
  principalPayment: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'integer' })
  deduction: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'totalCost', nullable: true, type: 'integer' })
  totalCost: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'integer' })
  amount: number;

  @ManyToOne(() => Application, application => application.debts)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @ManyToOne(() => EntityModel, entity => entity.debts)
  @JoinColumn({ name: 'nationalId', referencedColumnName: 'nationalId' })
  entity: EntityModel;
}