/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTestEnvironment, registerInitializer, SqljsInitializer } from '@vendure/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import path from 'path';

import { TEST_SETUP_TIMEOUT_MS, testConfig } from './config/test-config';
import { initialData } from './config/e2e-initial-data';
import { ReviewsPlugin } from '../reviews-plugin';

registerInitializer('sqljs', new SqljsInitializer(path.join(__dirname, '__data__')));

describe('Test 1', () => {
    const { server, adminClient, shopClient } = createTestEnvironment({
        ...testConfig(3012),
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

    it('should add 1+1', () => {
        expect(1 + 1).toEqual(2);
    });
});
