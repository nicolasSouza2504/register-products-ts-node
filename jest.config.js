export default {
    preset: 'ts-jest/presets/default-esm', // Suporte a TypeScript + ESM
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }]
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]

};
