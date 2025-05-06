import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from './application.model';
import { Entity as EntityModel } from './entity.model';

@ObjectType()
@Entity({ name: 'income' })
export class Income {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'applicationId', type: 'integer' })
  applicationId: number;

  @Field()
  @Column({ name: 'nationalId', length: 10 })
  nationalId: string;

  @Field()
  @Column({ name: 'payorId', length: 10 })
  payorId: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'integer' })
  amount: number;

  @Field({ nullable: true })
  @Column({ name: 'incomeType', nullable: true, length: 255 })
  incomeType: string;

  @ManyToOne(() => Application, application => application.incomes)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @ManyToOne(() => EntityModel, entity => entity.incomes)
  @JoinColumn({ name: 'nationalId', referencedColumnName: 'nationalId' })
  entity: EntityModel;

  @Field(() => EntityModel, { nullable: true })
  @ManyToOne(() => EntityModel, entity => entity.paymentsIssued)
  @JoinColumn({ name: 'payorId', referencedColumnName: 'nationalId' })
  payor: EntityModel;
}