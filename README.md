# Step-by-Step Tutorial: Setting up React + Esbuild + Typescript Project

## Project setup

### Prerequisites

Before you begin, make sure you have the following prerequisites installed:

- Node Version Manager (nvm)

### Step 1: Install Node.js

1. Open your terminal.
2. Install the latest LTS version of Node.js using nvm by running the following command:

   ```shell
   nvm install --lts
   ```

3. Create an .nvmrc file in your project's root directory and add the installed Node.js version to it by running the following command:

   ```shell
   node --version > .nvmrc
   ```

### Step 2: Install Yarn

1. Install Yarn globally by running the following command:

   ```shell
   npm -g install yarn
   ```

### Step 3: Initialize the Project

1. Create a new directory for your project.
2. Navigate to the project's root directory in the terminal.
3. Initialize a new private project using Yarn by running the following command:

   ```shell
   yarn init -yp
   ```

4. Edit the generated `package.json` file as needed. For example, you can remove the `"main"` field if you won't be publishing the package, change the `"license"`, etc.

### Step 4: Install Dependencies

1. Install the necessary packages for React, Esbuild, Typescript, and other required dependencies by running the following command:

   ```shell
   yarn add esbuild react react-dom dotenv typescript
   ```

2. Install type definitions for React and React DOM as dev dependencies by running the following command:

   ```shell
   yarn add -D @types/react @types/react-dom
   ```

3. Run `yarn install`

### Step 5: Configure Gitignore

1. Add following lines to `.gitignore`

   ```shell
   *.log
   .env
   coverage
   node_modules
   public/build/
   !public/build/.keep
   ```

### Step 6: Configure TypeScript

1. Initialize the `tsconfig.json` file by running the following command:

   ```shell
   yarn run tsc --init --rootDir src --jsx react --module es6 --moduleResolution node --noEmit true
   ```

### Step 7: Create Public Directory

1. Create a `public` directory in the project's root directory.

### Step 8: Add Public Files

1. Create an `index.html` file inside the `public` directory.
2. Add the following HTML code to the `index.html` file:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>Title</title>
       <meta name="description" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="manifest" href="/manifest.json" />
       <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
       <script type="module" src="./build/bundle.js"></script>
     </head>
     <body>
       <noscript>You need to enable JavaScript to run this app.</noscript>
       <div id="root"></div>
     </body>
   </html>
   ```

### Step 9: Add Optional Files

1. Optionally, you can add a `favicon.ico` file and a `manifest.json` file to the `public` directory.

### Step 10: Create Esbuild Configuration

1.  Create an `esbuild.config.js` file in the project's root directory.
2.  Add the following JavaScript code to the `esbuild.config.js` file:

    ```js
    import dotenv from 'dotenv';
    import esbuild from 'esbuild';

    dotenv.config();
    const args = process.argv;

    const config = {
      logLevel: 'info',
      entryPoints: ['src/index.ts'],
      outfile: 'public/build/bundle.js',
      bundle: true,
      define: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    };

    if (args.includes('--build')) {
      esbuild
        .build({
          ...config,
          minify: true,
          sourcemap: false,
        })
        .catch((e) => {
          console.error(e);
          process.exit(1);
        });
    }

    if (args.includes('--start')) {
      esbuild
        .context({
          ...config,
          minify: false,
          sourcemap: true,
        })
        .then(async (ctx) => {
          await ctx.watch(); // this is needed only if live reloading will be used
          await ctx.serve({
            servedir: 'public',
            onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
              console.info(remoteAddress, status, `"${method} ${path}" [${timeInMS}ms]`);
            },
          });
        })
        .catch((e) => {
          console.error(e);
          process.exit(1);
        });
    }
    ```

### Step 11: Enable Live Reloading (Optional)

1. Open the entry file (src/index.ts) in your code editor.
2. Add the following line of code at the beginning of the file:

   ```ts
   declare const NODE_ENV: string;
   if (NODE_ENV === 'development')
     new EventSource('/esbuild').addEventListener('change', () => location.reload());
   ```

### Step 12: Create Environment Variables File

1. Create a `.env` file in the project's root directory.
2. Add the following content to the `.env` file:

   ```env
   NODE_ENV=development
   ```

### Step 13: Update Package.json

1. Open the `package.json` file in your code editor.
2. Change the `"type"` field to `"module"` to enable ECMAScript modules:

   ```json
   "type": "module",
   ```

3. Add the following scripts to the `"scripts"` section of the `package.json` file:

   ```json
   "scripts": {
     "build": "node esbuild.config.js --build",
     "start": "node esbuild.config.js --start"
   },
   ```

### Step 14: Run the Project

1. Open your terminal.
2. Navigate to the project's root directory.
3. Start the project by running the following command:

   ```shell
   yarn start
   ```

4. The project should now be running, and you can view it in your browser at the specified URL.

Congratulations! You have successfully set up a React + Esbuild + Typescript project. You can now start developing your application using this setup.

## Test suite Setup

### Step 1: Install packages

- `jest`: A JavaScript testing framework used for writing and executing tests.
- `@testing-library/jest-dom`: Provides additional matchers and utilities for testing DOM-related behavior in Jest.
- `@testing-library/react`: Offers utilities for testing React components using the Testing Library approach.
- `@testing-library/user-event`: Allows simulating user events in React components during testing.
- `@types/jest`: TypeScript type definitions for Jest, ensuring accurate type information.
- `esbuild-jest`: A Jest transformer that compiles JSX and TypeScript in test files, leveraging the fast esbuild bundler.
- `jest-environment-jsdom`: Provides a JSDOM environment for Jest, allowing tests to interact with the DOM.

  ```shell
  yarn add -D jest \
  @testing-library/jest-dom @testing-library/react @testing-library/user-event \
  @types/jest esbuild-jest \
  jest-environment-jsdom
  ```

### Step 2: Add jest config

1. Create `jest.config.js`

   ```js
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
     coverageDirectory: 'coverage',
     // Indicates which provider should be used to instrument code for coverage
     coverageProvider: 'v8',
     // The root directory that Jest should scan for tests and modules within
     // rootDir: undefined,
     // A list of paths to directories that Jest should use to search for files in
     roots: ['src'],
     // The paths to modules that run some code to configure or set up the testing environment before each test
     // setupFiles: [],
     // A list of paths to modules that run some code to configure or set up the testing framework before each test
     setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
     // The number of seconds after which a test is considered as slow and reported as such in the results.
     slowTestThreshold: 5,
     // A list of paths to snapshot serializer modules Jest should use for snapshot testing
     // snapshotSerializers: [],
     // The test environment that will be used for testing
     testEnvironment: 'jsdom',
     // A map from regular expressions to paths to transformers
     transform: {
       '^.+\\.tsx?$': 'esbuild-jest',
       '^.+\\.ts?$': 'esbuild-jest',
     },
   };
   ```

### Step 3: Add tests setup file

1. Create `src/setupTests.ts`

   ```js
   // to expand availiable matchers in tests
   import '@testing-library/jest-dom';
   ```

### Step 4: Add scripts to `package.json`

1. Update your `package.json` file and add the following scripts:

   ```json
   "scripts": {
     "test": "jest --watch"
   }
   ```

## Linter and Formatter Setup

### Step 1: Install packages

1. Install the following packages using Yarn:

   - `eslint`: Code quality tool to catch bugs.
   - `eslint-plugin-compat`: Plugin to lint the browser compatibility of your code.
   - `eslint-plugin-react`: ESLint support for React.
   - `eslint-config-prettier`: Config extension to remove conflicts between ESLint and Prettier.
   - `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`: ESLint support for TypeScript.
   - `prettier`: Code formatter to make code style consistent.
   - (Optional) `@trivago/prettier-plugin-sort-imports`: Plugin for Prettier to automatically sort imports.

   ```shell
   yarn add -D eslint \
   eslint-plugin-compat eslint-plugin-react eslint-config-prettier \
   @typescript-eslint/eslint-plugin @typescript-eslint/parser \
   prettier @trivago/prettier-plugin-sort-imports
   ```

### Step 2: Add eslint config

1. Create `eslint.config.cjs` and add the following configuration:

   ```js
   module.exports = {
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended',
       'plugin:react/recommended',
       'plugin:compat/recommended',
       'prettier',
     ],
     overrides: [
       {
         env: {
           node: true,
         },
         files: ['.eslintrc.{js,cjs}'],
         parserOptions: {
           sourceType: 'script',
         },
       },
     ],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
     },
     plugins: ['@typescript-eslint', 'react', 'compat'],
     ignorePatterns: ['public/build/*'],
     settings: {
       react: {
         version: 'detect',
       },
     },
     rules: {},
   };
   ```

### Step 3: Add prettier config

1. Create `.prettierrc` (Optional, if you don't plan to use the import sort plugin, you can leave the defaults):

   ```json
   {
     "printWidth": 100,
     "singleQuote": true,
     "jsxSingleQuote": true,
     "importOrder": ["^@/(.*)$", "^[./]"],
     "importOrderSeparation": true,
     "importOrderSortSpecifiers": true
   }
   ```

2. Create `.prettierignore` and add the following line to exclude the `public/build` directory:

   ```shell
   public/build
   ```

### Step 4: (Optional) Add paths to `tsconfig.json`

1. Update your `tsconfig.json` file and add the following paths configuration to support absolute imports:

   ```json
   "baseUrl": "src",
   "paths": {
     "@/*": ["*"]
   }
   ```

### Step 5: Add scripts to `package.json`

1. Update your `package.json` file and add the following scripts:

   ```json
   "scripts": {
     "fmt": "prettier --write",
     "lint": "eslint --fix"
   }
   ```

Usage:

- Run ESLint and automatically fix linting issues:

  ```shell
  yarn lint .
  yarn lint <filepath>
  ```

- Format your code using Prettier:

  ```shell
  yarn fmt .
  yarn fmt <filepath>
  ```
