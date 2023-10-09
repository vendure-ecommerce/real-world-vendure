import { graphql } from '../types/admin';

export const GET_PRODUCT_REVIEW_DATA = graphql(`
    query GetProductReviewData($id: ID!) {
        product(id: $id) {
            id
            customFields {
                reviewCount
                reviewRating
            }
        }
    }
`);

export const APPROVE_REVIEW = graphql(`
    mutation ApproveReview($id: ID!) {
        approveProductReview(id: $id) {
            id
            state
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
