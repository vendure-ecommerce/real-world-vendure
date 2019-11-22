import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import {
    Allow,
    Ctx,
    getEntityOrThrow,
    ListQueryBuilder,
    patchEntity,
    Permission,
    Product,
    RequestContext,
} from '@vendure/core';
import { Connection } from 'typeorm';

import { ProductReview } from '../entities/product-review.entity';
import {
    MutationApproveProductReviewArgs,
    MutationRejectProductReviewArgs,
    MutationUpdateProductReviewArgs,
    QueryProductReviewArgs,
    QueryProductReviewsArgs,
} from '../generated-admin-types';

@Resolver()
export class ProductReviewAdminResolver {
    constructor(
        @InjectConnection() private connection: Connection,
        private listQueryBuilder: ListQueryBuilder,
    ) {}

    @Query()
    @Allow(Permission.ReadCatalog)
    async productReviews(@Ctx() ctx: RequestContext, @Args() args: QueryProductReviewsArgs) {
        return this.listQueryBuilder
            .build(ProductReview, args.options || undefined, {
                relations: ['product'],
            })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @Query()
    @Allow(Permission.ReadCatalog)
    async productReview(@Ctx() ctx: RequestContext, @Args() args: QueryProductReviewArgs) {
        return this.connection.getRepository(ProductReview).findOne(args.id, {
            relations: ['author', 'product', 'productVariant'],
        });
    }

    @Mutation()
    @Allow(Permission.UpdateCatalog)
    async updateProductReview(
        @Ctx() ctx: RequestContext,
        @Args() { input }: MutationUpdateProductReviewArgs,
    ) {
        const review = await getEntityOrThrow(this.connection, ProductReview, input.id);
        const originalResponse = review.response;
        const updatedShippingMethod = patchEntity(review, input as any);
        if (input.response !== originalResponse) {
            updatedShippingMethod.responseCreatedAt = new Date();
        }
        return this.connection.getRepository(ProductReview).save(updatedShippingMethod);
    }

    @Mutation()
    @Allow(Permission.UpdateCatalog)
    async approveProductReview(@Ctx() ctx: RequestContext, @Args() { id }: MutationApproveProductReviewArgs) {
        const review = await getEntityOrThrow(this.connection, ProductReview, id, { relations: ['product'] });
        if (review.state !== 'new') {
            return review;
        }
        const { product } = review;
        const newRating = this.calculateNewReviewAverage(review.rating, product);
        (product.customFields as any).reviewCount++;
        (product.customFields as any).reviewRating = newRating;
        await this.connection.getRepository(Product).save(product);
        review.state = 'approved';
        return this.connection.getRepository(ProductReview).save(review);
    }

    @Mutation()
    @Allow(Permission.UpdateCatalog)
    async rejectProductReview(@Ctx() ctx: RequestContext, @Args() { id }: MutationRejectProductReviewArgs) {
        const review = await getEntityOrThrow(this.connection, ProductReview, id);
        if (review.state !== 'new') {
            return review;
        }
        review.state = 'rejected';
        return this.connection.getRepository(ProductReview).save(review);
    }

    private calculateNewReviewAverage(rating: number, product: Product): number {
        const count = (product.customFields as any).reviewCount;
        const currentRating = (product.customFields as any).reviewRating || 0;
        const newRating = (currentRating * count + rating) / (count + 1);
        return newRating;
    }
}
