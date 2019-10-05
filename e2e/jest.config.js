module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testMatch: ['**/+(*.)+(spec|test|e2e-spec).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$' : 'ts-jest',
    },
};
