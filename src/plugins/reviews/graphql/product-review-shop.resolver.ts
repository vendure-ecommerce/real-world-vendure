import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Ctx,
    Customer,
    getEntityOrThrow,
    ListQueryBuilder,
    Product,
    ProductVariant,
    RequestContext,
} from '@vendure/core';
import { Connection } from 'typeorm';

import { ProductReview } from '../entities/product-review.entity';
import { MutationSubmitProductReviewArgs, MutationVoteOnReviewArgs } from '../generated-shop-types';

@Resolver()
export class ProductReviewShopResolver {
    constructor(
        @InjectConnection() private connection: Connection,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    @Mutation()
    async submitProductReview(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationSubmitProductReviewArgs,
    ) {
        const review = new ProductReview(input);
        const product = await getEntityOrThrow(this.connection, Product, input.productId);
        review.product = product;
        review.state = 'new';
        if (input.variantId) {
            const variant = await getEntityOrThrow(this.connection, ProductVariant, input.variantId);
            review.productVariant = variant;
        }
        if (input.customerId) {
            const customer = await getEntityOrThrow(this.connection, Customer, input.customerId);
            review.author = customer;
        }
        return this.connection.getRepository(ProductReview).save(review);
    }

    @Mutation()
    async voteOnReview(@Ctx() ctx: RequestContext, @Args() { id, vote }: MutationVoteOnReviewArgs) {
        const review = await getEntityOrThrow(this.connection, ProductReview, id, {
            relations: ['product'],
            where: {
                state: 'approved',
            },
        });
        if (vote) {
            review.upvotes++;
        } else {
            review.downvotes++;
        }
        return this.connection.getRepository(ProductReview).save(review);
    }
}
