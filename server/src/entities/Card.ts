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
import { Client } from './Client';

@ObjectType()
@Entity()
export class Card extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  cardNumber!: string;

  @Field()
  @Column()
  cardProvider: string;

  @Field()
  @Column()
  cvv!: string;

  @Field()
  @Column()
  pin!: string;

  @Field()
  @Column()
  expiryDate!: string;

  @Field()
  @Column()
  clientId: number;

  @OneToOne(() => Client, (client) => client.cardInfo)
  client: Client;

  @Field()
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
