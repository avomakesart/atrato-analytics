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
import { Card } from '../entities/Card';

@InputType()
class CardInput {
  @Field()
  cardNumber!: string;
  @Field()
  cardProvider: string;
  @Field()
  cvv!: string;
  @Field()
  pin!: string;
  @Field()
  expiryDate!: string;
}

@ObjectType()
class PaginatedCards {
  @Field(() => [Card])
  cards: Card[];
  @Field()
  hasMore: boolean;
}

@Resolver(Card)
export class CardResolver {
  @Mutation(() => Card)
  async createCard(
    @Arg('input') input: CardInput,
    @Arg('clientId') clientId: number
  ): Promise<Card> {
    return Card.create({ ...input, clientId: clientId }).save();
  }

  @Query(() => PaginatedCards)
  async cards(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCards> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const cards = await getConnection().query(
      `
        select c.*
        from card c
        ${cursor ? `where c."createdAt" < $2` : ''}
        order by c."createdAt" ASC
        limit $1
        `,
      replacements
    );

    return {
      cards: cards.slice(0, realLimit),
      hasMore: cards.length === realLimitPlusOne,
    };
  }

  @Query(() => Card, { nullable: true })
  card(@Arg('id', () => Int) id: number): Promise<Card | undefined> {
    return Card.findOne(id);
  }

  @Mutation(() => Card, { nullable: true })
  async updateCard(
    @Arg('id', () => Int) id: number,
    @Arg('input') input: CardInput
  ): Promise<Card | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Card)
      .set({ ...input })
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => String)
  async deleteCard(
    @Arg('id', () => Int) id: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any | string | boolean> {
    await Card.delete({ id });

    return { mesage: 'Card has been deleted successfully', status: true };
  }
}
