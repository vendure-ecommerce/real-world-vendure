import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core';

import { ProductReview } from './entities/product-review.entity';
import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { ProductEntityResolver } from './api/product-entity.resolver';
import { ProductReviewAdminResolver } from './api/product-review-admin.resolver';
import { ProductReviewEntityResolver } from './api/product-review-entity.resolver';
import { ProductReviewShopResolver } from './api/product-review-shop.resolver';
import path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [ProductReview],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ProductEntityResolver, ProductReviewAdminResolver, ProductReviewEntityResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ProductEntityResolver, ProductReviewShopResolver, ProductReviewEntityResolver],
    },
    configuration: config => {
        config.customFields.Product.push({
            name: 'reviewRating',
            label: [{ languageCode: LanguageCode.en, value: 'Review rating' }],
            public: true,
            nullable: true,
            type: 'float',
            ui: { component: 'star-rating-form-input' },
        });
        config.customFields.Product.push({
            name: 'reviewCount',
            label: [{ languageCode: LanguageCode.en, value: 'Review count' }],
            public: true,
            defaultValue: 0,
            type: 'float',
            ui: { component: 'review-count-link' },
        });
        config.customFields.Product.push({
            name: 'featuredReview',
            label: [{ languageCode: LanguageCode.en, value: 'Featured review' }],
            public: true,
            type: 'relation',
            entity: ProductReview,
            ui: { component: 'review-selector-form-input' },
        });
        return config;
    },
})
export class ReviewsPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'reviews-ui-extension.module.ts',
                ngModuleName: 'ReviewsUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: 'product-reviews',
                ngModuleFileName: 'reviews-ui-lazy.module.ts',
                ngModuleName: 'ReviewsUiLazyModule',
            },
        ],
    };
}
