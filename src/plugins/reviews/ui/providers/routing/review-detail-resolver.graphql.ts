import gql from 'graphql-tag';

import { PRODUCT_REVIEW_FRAGMENT } from '../../common/fragments.graphql';

export const GET_REVIEW = gql`
    query GetReview($id: ID!) {
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
    ${PRODUCT_REVIEW_FRAGMENT}
`;
