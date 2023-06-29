/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Stop running tests after `n` failures
  bail: 1,
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "src"
  ],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // The number of seconds after which a test is considered as slow and reported as such in the results.
  slowTestThreshold: 5,
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // A map from regular expressions to paths to transformers
  "transform": {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.ts?$": "esbuild-jest"
  }
};
