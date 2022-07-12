import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Client, ClientStatuses } from '../entities';

@InputType()
class ClientInput {
  @Field()
  firstName!: string;

  @Field()
  secondName: string;

  @Field()
  lastName!: string;

  @Field()
  secondLastName!: string;

  @Field()
  birthDate!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field()
  status: ClientStatuses;

  @Field()
  assignedAnalyst!: string;
}

@InputType()
class ClientUpdateInput {
  @Field()
  firstName!: string;

  @Field()
  secondName: string;

  @Field()
  lastName!: string;

  @Field()
  secondLastName!: string;

  @Field()
  birthDate!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;
}

@ObjectType()
class PaginatedClients {
  @Field(() => [Client])
  clients: Client[];
  @Field()
  hasMore: boolean;
}

@Resolver(Client)
export class ClientResolver {
  @Mutation(() => Client)
  async createClient(@Arg('input') input: ClientInput): Promise<Client> {
    return Client.create({ ...input }).save();
  }

  @Query(() => PaginatedClients)
  async clients(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedClients> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const clients = await getConnection().query(
      `
        select c.*
        from client c
        ${cursor ? `where c."createdAt" < $2` : ''}
        order by c."createdAt" ASC
        limit $1
        `,
      replacements
    );

    return {
      clients: clients.slice(0, realLimit),
      hasMore: clients.length === realLimitPlusOne,
    };
  }

  @Query(() => Client, { nullable: true })
  client(@Arg('id', () => Int) id: number): Promise<Client | undefined> {
    return Client.findOne(id);
  }

  @Mutation(() => Client, { nullable: true })
  async updateClient(
    @Arg('id', () => Int) id: number,
    @Arg('input') input: ClientUpdateInput
  ): Promise<Client | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set({ ...input })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Client, { nullable: true })
  async updateClientStatus(
    @Arg('id', () => Int) id: number,
    @Arg('status') status: ClientStatuses
  ): Promise<Client | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Client)
      .set({
        status,
      })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteClient(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Client.delete({ id });

    return true;
  }
}
