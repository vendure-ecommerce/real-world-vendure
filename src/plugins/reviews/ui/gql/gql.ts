/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    fragment ProductReview on ProductReview {\n        id\n        createdAt\n        updatedAt\n        authorName\n        authorLocation\n        summary\n        body\n        rating\n        state\n        upvotes\n        downvotes\n        response\n        responseCreatedAt\n    }\n": types.ProductReviewFragmentDoc,
    "\n    query GetAllReviews($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                ...ProductReview\n                product {\n                    id\n                    name\n                    featuredAsset {\n                        id\n                        preview\n                    }\n                }\n            }\n            totalItems\n        }\n    }\n    \n": types.GetAllReviewsDocument,
    "\n    mutation UpdateReview($input: UpdateProductReviewInput!) {\n        updateProductReview(input: $input) {\n            ...ProductReview\n        }\n    }\n": types.UpdateReviewDocument,
    "\n    mutation ApproveReview($id: ID!) {\n        approveProductReview(id: $id) {\n            id\n            state\n            product {\n                id\n                customFields {\n                    reviewCount\n                    reviewRating\n                }\n            }\n        }\n    }\n": types.ApproveReviewDocument,
    "\n    mutation RejectReview($id: ID!) {\n        rejectProductReview(id: $id) {\n            id\n            state\n        }\n    }\n": types.RejectReviewDocument,
    "\n    query GetReviewForProduct($productId: ID!, $options: ProductReviewListOptions) {\n        product(id: $productId) {\n            id\n            reviews(options: $options) {\n                items {\n                    ...ProductReview\n                }\n                totalItems\n            }\n        }\n    }\n    \n": types.GetReviewForProductDocument,
    "\n    query GetReviewsHistogram($id: ID!) {\n        product(id: $id) {\n            id\n            name\n            featuredAsset {\n                id\n                preview\n            }\n            customFields {\n                reviewRating\n                reviewCount\n            }\n            reviewsHistogram {\n                bin\n                frequency\n            }\n        }\n    }\n": types.GetReviewsHistogramDocument,
    "\n    query GetReviewDetail($id: ID!) {\n        productReview(id: $id) {\n            ...ProductReview\n            product {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n            productVariant {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n        }\n    }\n": types.GetReviewDetailDocument,
    "\n    query GetReviewsForWidget($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                id\n                authorName\n                summary\n                rating\n                state\n                createdAt\n                product {\n                    id\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n": types.GetReviewsForWidgetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ProductReview on ProductReview {\n        id\n        createdAt\n        updatedAt\n        authorName\n        authorLocation\n        summary\n        body\n        rating\n        state\n        upvotes\n        downvotes\n        response\n        responseCreatedAt\n    }\n"): (typeof documents)["\n    fragment ProductReview on ProductReview {\n        id\n        createdAt\n        updatedAt\n        authorName\n        authorLocation\n        summary\n        body\n        rating\n        state\n        upvotes\n        downvotes\n        response\n        responseCreatedAt\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllReviews($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                ...ProductReview\n                product {\n                    id\n                    name\n                    featuredAsset {\n                        id\n                        preview\n                    }\n                }\n            }\n            totalItems\n        }\n    }\n    \n"): (typeof documents)["\n    query GetAllReviews($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                ...ProductReview\n                product {\n                    id\n                    name\n                    featuredAsset {\n                        id\n                        preview\n                    }\n                }\n            }\n            totalItems\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateReview($input: UpdateProductReviewInput!) {\n        updateProductReview(input: $input) {\n            ...ProductReview\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateReview($input: UpdateProductReviewInput!) {\n        updateProductReview(input: $input) {\n            ...ProductReview\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ApproveReview($id: ID!) {\n        approveProductReview(id: $id) {\n            id\n            state\n            product {\n                id\n                customFields {\n                    reviewCount\n                    reviewRating\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation ApproveReview($id: ID!) {\n        approveProductReview(id: $id) {\n            id\n            state\n            product {\n                id\n                customFields {\n                    reviewCount\n                    reviewRating\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RejectReview($id: ID!) {\n        rejectProductReview(id: $id) {\n            id\n            state\n        }\n    }\n"): (typeof documents)["\n    mutation RejectReview($id: ID!) {\n        rejectProductReview(id: $id) {\n            id\n            state\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetReviewForProduct($productId: ID!, $options: ProductReviewListOptions) {\n        product(id: $productId) {\n            id\n            reviews(options: $options) {\n                items {\n                    ...ProductReview\n                }\n                totalItems\n            }\n        }\n    }\n    \n"): (typeof documents)["\n    query GetReviewForProduct($productId: ID!, $options: ProductReviewListOptions) {\n        product(id: $productId) {\n            id\n            reviews(options: $options) {\n                items {\n                    ...ProductReview\n                }\n                totalItems\n            }\n        }\n    }\n    \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetReviewsHistogram($id: ID!) {\n        product(id: $id) {\n            id\n            name\n            featuredAsset {\n                id\n                preview\n            }\n            customFields {\n                reviewRating\n                reviewCount\n            }\n            reviewsHistogram {\n                bin\n                frequency\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetReviewsHistogram($id: ID!) {\n        product(id: $id) {\n            id\n            name\n            featuredAsset {\n                id\n                preview\n            }\n            customFields {\n                reviewRating\n                reviewCount\n            }\n            reviewsHistogram {\n                bin\n                frequency\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetReviewDetail($id: ID!) {\n        productReview(id: $id) {\n            ...ProductReview\n            product {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n            productVariant {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetReviewDetail($id: ID!) {\n        productReview(id: $id) {\n            ...ProductReview\n            product {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n            productVariant {\n                id\n                name\n                featuredAsset {\n                    id\n                    preview\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetReviewsForWidget($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                id\n                authorName\n                summary\n                rating\n                state\n                createdAt\n                product {\n                    id\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n"): (typeof documents)["\n    query GetReviewsForWidget($options: ProductReviewListOptions) {\n        productReviews(options: $options) {\n            items {\n                id\n                authorName\n                summary\n                rating\n                state\n                createdAt\n                product {\n                    id\n                    name\n                }\n            }\n            totalItems\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;