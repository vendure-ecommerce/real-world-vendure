import gql from 'graphql-tag';

import { PRODUCT_REVIEW_FRAGMENT } from '../../common/fragments.graphql';

export const GET_REVIEWS_FOR_PRODUCT = gql`
    query GetReviewForProduct($productId: ID!, $options: ProductReviewListOptions) {
        product(id: $productId) {
            id
            reviews(options: $options) {
                items {
                    ...ProductReview
                }
                totalItems
            }
        }
    }
    ${PRODUCT_REVIEW_FRAGMENT}
`;

export const GET_PRODUCT_PREVIEW_AND_HISTOGRAM = gql`
    query GetReviewsHistogram($id: ID!) {
        product(id: $id) {
            id
            name
            featuredAsset {
                id
                preview
            }
            customFields {
                reviewRating
                reviewCount
            }
            reviewsHistogram {
                bin
                frequency
            }
        }
    }
`;
