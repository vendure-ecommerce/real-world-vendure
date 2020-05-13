/* eslint-disable @typescript-eslint/no-var-requires */
import { bootstrap, defaultConfig, mergeConfig, RuntimeVendureConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { clearAllTables, populateCustomers, SimpleGraphQLClient } from '@vendure/testing';
import { config } from './src/vendure-config';
import path from 'path';
import gql from 'graphql-tag';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';

const initialData = require('@vendure/create/assets/initial-data.json');

// tslint:disable:no-console

/**
 * A CLI script which populates the database with some sample data
 */
if (require.main === module) {
    // Running from command line
    const populateConfig = mergeConfig(
        defaultConfig,
        mergeConfig(config, {
            authOptions: {
                tokenMethod: 'bearer',
                requireVerification: false,
            },
            importExportOptions: {
                importAssetsDir: resolveFromCreatePackage('assets/images'),
            },
            workerOptions: {
                runInMainProcess: true,
            },
            customFields: {},
            plugins: config.plugins!.filter(plugin => plugin !== AdminUiPlugin),
        }),
    );
    clearAllTables(populateConfig, true)
        .then(() =>
            populate(
                () => bootstrap(populateConfig),
                initialData,
                resolveFromCreatePackage('assets/products.csv'),
            ),
        )
        .then(async app => {
            console.log('populating customers...');
            await populateCustomers(10, populateConfig, true);
            await populateReview(populateConfig);
            return app.close();
        })
        .then(
            () => process.exit(0),
            err => {
                console.log(err);
                process.exit(1);
            },
        );
}

function resolveFromCreatePackage(target: string): string {
    return path.join(path.dirname(require.resolve('@vendure/create')), target);
}

async function populateReview(config: RuntimeVendureConfig) {
    const { port, shopApiPath } = config.apiOptions;
    const client = new SimpleGraphQLClient(config, `http://localhost:${port}/${shopApiPath}`);

    await client.query(gql`
        mutation {
            submitProductReview(input: {
                productId: "1",
                summary: "A great laptop!",
                body: "The laptop looks great an performance is flawless."
                rating: 5,
                authorName: "Randall M",
                authorLocation: "Vienna",
            }) {
                id
            }
        }
    `);
}
