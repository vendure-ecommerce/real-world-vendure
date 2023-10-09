import { registerRouteComponent } from '@vendure/admin-ui/core';

import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component';
import { ProductReviewDetailComponent } from './components/product-review-detail/product-review-detail.component';
import { GetReviewDetailDocument } from './generated-types';

export default [
    registerRouteComponent({
        path: '',
        component: AllProductReviewsListComponent,
        breadcrumb: [
            {
                label: 'Product reviews',
                link: ['/extensions', 'product-reviews'],
            },
        ],
    }),
    registerRouteComponent({
        path: ':id',
        component: ProductReviewDetailComponent,
        query: GetReviewDetailDocument,
        entityKey: 'productReview',
        getBreadcrumbs: entity => [
            {
                label: 'Product reviews',
                link: ['/extensions', 'product-reviews'],
            },
            {
                label: `#${entity?.id} (${entity?.product.name})`,
                link: [],
            },
        ],
    }),
];
