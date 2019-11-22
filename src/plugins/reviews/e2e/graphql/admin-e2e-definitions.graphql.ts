import gql from 'graphql-tag';

export const GET_PRODUCT_REVIEW_DATA = gql`
    query GetProductReviewData($id: ID!) {
        product(id: $id) {
            id
            customFields {
                reviewCount
                reviewRating
            }
        }
    }
`;

export const APPROVE_REVIEW = gql`
    mutation ApproveReview($id: ID!) {
        approveProductReview(id: $id) {
            id
            state
        }
    }
`;

export const REJECT_REVIEW = gql`
    mutation RejectReview($id: ID!) {
        rejectProductReview(id: $id) {
            id
            state
        }
    }
`;
