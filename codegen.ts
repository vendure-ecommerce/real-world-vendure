import type { CodegenConfig } from '@graphql-codegen/cli';

const typescriptPlugins = [
    {
        add: {
            // Use the "add" plugin to add the eslint-disable comment to the top of the generated file.
            content: '/* eslint-disable */',
        },
    },
    'typescript',
];
const typescriptClientPlugins = ['typescript-operations', 'typed-document-node'];
const clientScalars = {
    scalars: {
        ID: 'string',
        Money: 'number',
    },
};

const config: CodegenConfig = {
    overwrite: true,
    config: {
        strict: true,
        namingConvention: {
            typeNames: 'change-case-all#pascalCase',
            enumValues: 'keep',
        },
        scalars: {
            ID: 'string | number',
        },
        maybeValue: 'T',
    },
    generates: {
        'src/plugins/reviews/generated-admin-types.ts': {
            schema: 'http://localhost:3000/admin-api',
            plugins: typescriptPlugins,
        },
        'src/plugins/reviews/generated-shop-types.ts': {
            schema: 'http://localhost:3000/shop-api',
            plugins: typescriptPlugins,
        },
        'src/plugins/reviews/e2e/types/generated-shop-types.ts': {
            schema: 'http://localhost:3000/shop-api',
            documents: 'src/plugins/reviews/e2e/graphql/shop-e2e-definitions.graphql.ts',
            plugins: [...typescriptPlugins, ...typescriptClientPlugins],
            config: clientScalars,
        },
        'src/plugins/reviews/e2e/types/generated-admin-types.ts': {
            schema: 'http://localhost:3000/admin-api',
            documents: 'src/plugins/reviews/e2e/graphql/admin-e2e-definitions.graphql.ts',
            plugins: [...typescriptPlugins, ...typescriptClientPlugins],
            config: clientScalars,
        },
        'src/plugins/reviews/ui/generated-types.ts': {
            schema: 'http://localhost:3000/admin-api',
            documents: 'src/plugins/reviews/ui/**/*.ts',
            plugins: [...typescriptPlugins, ...typescriptClientPlugins],
            config: clientScalars,
        },
    },
};
export default config;
