import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from '.';

export enum ClientStatuses {
  PENDING = 'PENDIENTE',
  INPROGRESS = 'EN PROCESO',
  COMPLETED = 'COMPLETADO',
}

@ObjectType()
@Entity()
export class Client extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  secondName: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  secondLastName!: string;

  @Field()
  @Column()
  birthDate!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column({ default: 'PENDING' })
  status: ClientStatuses;

  @Field()
  @Column()
  assignedAnalyst!: string;

  @OneToOne(() => Card, (card) => card.client)
  cardInfo: Card;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
