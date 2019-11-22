import gql from 'graphql-tag';

import { PRODUCT_REVIEW_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_REVIEWS = gql`
    query GetAllReviews($options: ProductReviewListOptions) {
        productReviews(options: $options) {
            items {
                ...ProductReview
                product {
                    id
                    name
                    featuredAsset {
                        id
                        preview
                    }
                }
            }
            totalItems
        }
    }
    ${PRODUCT_REVIEW_FRAGMENT}
`;
