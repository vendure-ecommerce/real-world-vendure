import type { CodegenConfig } from '@graphql-codegen/cli';

const clientConfig = {
    preset: 'client',
    presetConfig: {
        fragmentMasking: false,
    },
} as const;

const config: CodegenConfig = {
    overwrite: true,
    config: {
        strict: true,
        namingConvention: {
            typeNames: 'change-case-all#pascalCase',
            enumValues: 'keep',
        },
        scalars: {
            ID: 'string',
            Money: 'number',
            DateTime: { input: 'Date', output: 'string' },
        },
        maybeValue: 'T',
    },
    generates: {
        'src/plugins/reviews/generated-admin-types.ts': {
            schema: 'http://localhost:3000/admin-api',
            plugins: ['typescript'],
        },
        'src/plugins/reviews/generated-shop-types.ts': {
            schema: 'http://localhost:3000/shop-api',
            plugins: ['typescript'],
        },
        'src/plugins/reviews/e2e/types/shop/': {
            schema: 'http://localhost:3000/shop-api',
            documents: 'src/plugins/reviews/e2e/graphql/shop-e2e-definitions.graphql.ts',
            ...clientConfig,
        },
        'src/plugins/reviews/e2e/types/admin/': {
            schema: 'http://localhost:3000/admin-api',
            documents: 'src/plugins/reviews/e2e/graphql/admin-e2e-definitions.graphql.ts',
            ...clientConfig,
        },
        'src/plugins/reviews/ui/gql/': {
            schema: 'http://localhost:3000/admin-api',
            documents: 'src/plugins/reviews/ui/**/*.ts',
            ...clientConfig,
        },
    },
};
export default config;
