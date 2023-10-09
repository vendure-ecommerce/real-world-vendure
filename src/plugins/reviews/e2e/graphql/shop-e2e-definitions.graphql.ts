import { graphql } from '../types/shop';

export const SUBMIT_PRODUCT_REVIEW = graphql(`
    mutation SubmitProductReview($input: SubmitProductReviewInput!) {
        submitProductReview(input: $input) {
            authorLocation
            authorName
            body
            createdAt
            downvotes
            id
            rating
            response
            responseCreatedAt
            state
            summary
            updatedAt
            upvotes
        }
    }
`);
