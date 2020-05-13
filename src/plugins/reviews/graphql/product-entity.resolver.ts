import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Api, ApiType, ListQueryBuilder, Product } from '@vendure/core';
import { Connection } from 'typeorm';

import { ProductReview } from '../entities/product-review.entity';
import { ProductReviewsArgs } from '../generated-shop-types';

@Resolver('Product')
export class ProductEntityResolver {
    constructor(
        private listQueryBuilder: ListQueryBuilder,
        @InjectConnection() private connection: Connection,
    ) {}

    @ResolveField()
    reviews(@Api() apiType: ApiType, @Parent() product: Product, @Args() args: ProductReviewsArgs) {
        return this.listQueryBuilder
            .build(ProductReview, args.options || undefined, {
                where: {
                    product,
                    ...(apiType === 'shop' ? { state: 'approved' } : {}),
                },
                relations: ['product', 'product.featuredAsset'],
            })
            .getManyAndCount()
            .then(([items, totalItems]) => ({
                items,
                totalItems,
            }));
    }

    @ResolveField()
    reviewsHistogram(@Parent() product: Product) {
        return this.connection
            .createQueryBuilder()
            .select('ROUND(`rating`)', 'bin')
            .addSelect('COUNT(*)', 'frequency')
            .from(ProductReview, 'review')
            .where('review.product = :productId', { productId: product.id })
            .andWhere('review.state = :state', { state: 'approved' })
            .groupBy('ROUND(`rating`)')
            .getRawMany();
    }
}
