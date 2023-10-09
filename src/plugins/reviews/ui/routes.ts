import { registerRouteComponent } from '@vendure/admin-ui/core';

import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component';
import { ProductReviewDetailComponent } from './components/product-review-detail/product-review-detail.component';
import { graphql } from './gql';

export const GET_REVIEW_DETAIL = graphql(`
    query GetReviewDetail($id: ID!) {
        productReview(id: $id) {
            ...ProductReview
            product {
                id
                name
                featuredAsset {
                    id
                    preview
                }
            }
            productVariant {
                id
                name
                featuredAsset {
                    id
                    preview
                }
            }
        }
    }
`);

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
        query: GET_REVIEW_DETAIL,
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
