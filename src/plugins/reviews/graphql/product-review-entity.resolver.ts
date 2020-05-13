import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectConnection } from '@nestjs/typeorm';
import { Ctx, Product, ProductVariant, RequestContext, translateDeep } from '@vendure/core';
import { Connection } from 'typeorm';

import { ProductReview } from '../entities/product-review.entity';

@Resolver('ProductReview')
export class ProductReviewEntityResolver {
    constructor(@InjectConnection() private connection: Connection) {}

    @ResolveField()
    async product(@Parent() review: ProductReview, @Ctx() ctx: RequestContext) {
        let product: Product | null = review.product;
        if (!product) {
            const reviewWithProduct = await this.connection.getRepository(ProductReview).findOne(review.id, {
                relations: ['product'],
            });
            if (reviewWithProduct) {
                product = reviewWithProduct.product;
            }
        }
        if (product) {
            return translateDeep(product, ctx.languageCode);
        }
    }

    @ResolveField()
    async productVariant(@Parent() review: ProductReview, @Ctx() ctx: RequestContext) {
        let productVariant: ProductVariant | null = review.productVariant;
        if (!productVariant) {
            const reviewWithProductVariant = await this.connection
                .getRepository(ProductReview)
                .findOne(review.id, {
                    relations: ['productVariant'],
                });
            if (reviewWithProductVariant) {
                productVariant = reviewWithProductVariant.productVariant;
            }
        }
        if (productVariant) {
            return translateDeep(productVariant, ctx.languageCode);
        }
    }
}
