/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTestEnvironment, registerInitializer, SqljsInitializer } from '@vendure/testing';
import path from 'path';

import { ReviewsPlugin } from '../reviews-plugin';
import { RejectReview } from '../ui/generated-types';

import {
    APPROVE_REVIEW,
    GET_PRODUCT_REVIEW_DATA,
    REJECT_REVIEW,
} from './graphql/admin-e2e-definitions.graphql';
import { SUBMIT_PRODUCT_REVIEW } from './graphql/shop-e2e-definitions.graphql';
import { ApproveReview, GetProductReviewData } from './types/generated-admin-types';
import { SubmitProductReview } from './types/generated-shop-types';
import { TEST_SETUP_TIMEOUT_MS, testConfig } from './config/test-config';
import { initialData } from './config/e2e-initial-data';

registerInitializer('sqljs', new SqljsInitializer(path.join(__dirname, '__data__')));

describe('reviews plugin', () => {
    let firstReviewId: string;

    const { server, adminClient, shopClient } = createTestEnvironment({
        ...testConfig,
        plugins: [ReviewsPlugin],
    });

    beforeAll(async () => {
        await server.init({
            initialData,
            productsCsvPath: path.join(__dirname, 'config/e2e-products.csv'),
            customerCount: 1,
        });
        await adminClient.asSuperAdmin();
    }, TEST_SETUP_TIMEOUT_MS);

    afterAll(async () => {
        await server.destroy();
    });

    it('reviews initial values', async () => {
        const customFields = await getProductReviewData('T_1');
        expect(customFields).toEqual({
            reviewCount: 0,
            reviewRating: null,
        });
    });

    it('submit a guest review', async () => {
        const { submitProductReview } = await shopClient.query<
            SubmitProductReview.Mutation,
            SubmitProductReview.Variables
        >(SUBMIT_PRODUCT_REVIEW, {
            input: {
                productId: 'T_1',
                variantId: 'T_1',
                authorName: 'Bobby Smith',
                authorLocation: 'Woking',
                rating: 4,
                summary: 'Review summary',
                body: 'Review body',
            },
        });

        expect(submitProductReview.state).toEqual('new');
        firstReviewId = submitProductReview.id;
    });

    it('unapproved review does not affect rating', async () => {
        const customFields = await getProductReviewData('T_1');
        expect(customFields).toEqual({
            reviewCount: 0,
            reviewRating: null,
        });
    });

    it('approving a review', async () => {
        const { approveProductReview } = await adminClient.query<
            ApproveReview.Mutation,
            ApproveReview.Variables
        >(APPROVE_REVIEW, {
            id: firstReviewId,
        });

        expect(approveProductReview!.state).toBe('approved');

        const customFields = await getProductReviewData('T_1');
        expect(customFields).toEqual({
            reviewCount: 1,
            reviewRating: 4,
        });
    });

    it('rejected review does not affect rating', async () => {
        const submitProductReview = await submitReviewWithRating(1);

        const { rejectProductReview } = await adminClient.query<
            RejectReview.Mutation,
            RejectReview.Variables
        >(REJECT_REVIEW, {
            id: submitProductReview.id,
        });

        expect(rejectProductReview!.state).toBe('rejected');

        const customFields = await getProductReviewData('T_1');
        expect(customFields).toEqual({
            reviewCount: 1,
            reviewRating: 4,
        });
    });

    it('additional reviews update average rating', async () => {
        const submitProductReview = await submitReviewWithRating(1);

        await adminClient.query<ApproveReview.Mutation, ApproveReview.Variables>(APPROVE_REVIEW, {
            id: submitProductReview.id,
        });

        const customFields = await getProductReviewData('T_1');
        expect(customFields).toEqual({
            reviewCount: 2,
            reviewRating: 2.5,
        });
    });

    async function getProductReviewData(id: string) {
        const { product } = await adminClient.query<
            GetProductReviewData.Query,
            GetProductReviewData.Variables
        >(GET_PRODUCT_REVIEW_DATA, { id });

        return product!.customFields;
    }

    async function submitReviewWithRating(rating: number) {
        const { submitProductReview } = await shopClient.query<
            SubmitProductReview.Mutation,
            SubmitProductReview.Variables
        >(SUBMIT_PRODUCT_REVIEW, {
            input: {
                productId: 'T_1',
                authorName: 'Bobby Smith',
                rating,
                summary: 'Review summary',
                body: 'Review body',
            },
        });
        return submitProductReview;
    }
});
