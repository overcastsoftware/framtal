import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from './application.model';
import { Entity as EntityModel } from './entity.model';

@ObjectType()
@Entity({ name: 'asset' })
export class Asset {
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

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, type: 'integer' })
  amount: number;

  @Field({ nullable: true })
  @Column({ name: 'assetType', nullable: true, length: 255 })
  assetType: string;

  @Field({ nullable: true })
  @Column({ name: 'assetIdentifier', nullable: true, length: 255 })
  assetIdentifier: string;

  @ManyToOne(() => Application, application => application.assets)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @ManyToOne(() => EntityModel, entity => entity.assets)
  @JoinColumn({ name: 'nationalId', referencedColumnName: 'nationalId' })
  entity: EntityModel;
}