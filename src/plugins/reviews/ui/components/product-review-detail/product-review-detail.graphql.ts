import { graphql } from '../../gql';

export const UPDATE_REVIEW = graphql(`
    mutation UpdateReview($input: UpdateProductReviewInput!) {
        updateProductReview(input: $input) {
            ...ProductReview
        }
    }
`);

export const APPROVE_REVIEW = graphql(`
    mutation ApproveReview($id: ID!) {
        approveProductReview(id: $id) {
            id
            state
            product {
                id
                customFields {
                    reviewCount
                    reviewRating
                }
            }
        }
    }
`);

export const REJECT_REVIEW = graphql(`
    mutation RejectReview($id: ID!) {
        rejectProductReview(id: $id) {
            id
            state
        }
    }
`);
