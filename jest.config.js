/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: !process.argv.includes('--selectProjects') ? 10 : process.argv.includes('lint') ? 0 : 1,

  reporters: process.argv.includes('test')
    ? ['default']
    : [['jest-silent-reporter', { showWarnings: true }]],

  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  projects: [
    {
      displayName: 'test',

      rootDir: '<rootDir>',
      // setupFiles: [],
      setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
      slowTestThreshold: 5,
      // snapshotSerializers: [],
      testEnvironment: 'jsdom',

      moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },

      transform: {
        '^.+\\.(tsx|ts)?$': 'esbuild-jest',
      },
    },
    {
      displayName: 'lint',

      runner: 'eslint',

      rootDir: '.',
      testMatch: ['**/*.[jt]s?(x)'],
      testPathIgnorePatterns: ['/coverage/', '/public/'],

      transform: {
        '^.+\\.(tsx|ts)?$': 'esbuild-jest',
      },
    },
  ],
};
