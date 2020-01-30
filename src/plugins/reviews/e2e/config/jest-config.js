module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '..',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/config/tsconfig.e2e.json',
            diagnostics: false,
        },
    },
};
