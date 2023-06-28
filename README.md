# Step-by-Step Tutorial: Setting up React + Esbuild + Typescript Project

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

### Step 5: Configure Gitignore
1. Add following lines to `.gitignore`
   ```shell
   node_modules
   .env
   public/build/
   !public/build/.keep
   ```

### Step 6: Configure TypeScript
1. Initialize the `tsconfig.json` file by running the following command:
   ```shell
   yarn run tsc --init --rootDir src --jsx react --module es6
   ```

### Step 7: Create Public Directory
1. Create a `public` directory in the project's root directory.

### Step 8: Add Public Files
1. Create an `index.html` file inside the `public` directory.
2. Add the following HTML code to the `index.html` file:
   ```html
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <title>Title</title>
       <meta name="description">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <link rel="manifest" href="/manifest.json" />
       <link rel="apple-touch-icon" href="/apple-touch-icon.png">
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
1. Create an `esbuild.config.js` file in the project's root directory.
2. Add the following JavaScript code to the `esbuild.config.js` file:
   ```js
import esbuild from 'esbuild';
import dotenv from 'dotenv';

dotenv.config();
const args = process.argv;

const config = {
  logLevel: 'info',
  entryPoints: ['src/index.ts'],
  outfile: 'public/build/bundle.js',
  bundle: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production'
    ),
  },
};

if (args.includes('--build')) {
  esbuild
    .build({
      ...config,
      minify: true,
      sourcemap: false,
    })
    .catch(e => {
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
    .then(async ctx => {
      await ctx.watch(); // this is needed only if live reloading will be used
      await ctx.serve({
        servedir: 'public',
        onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
          console.info(
            remoteAddress,
            status,
            `"${method} ${path}" [${timeInMS}ms]`
          );
        },
      });
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}
```

### Step 11: Enable Live Reloading (Optional)
1. Open the entry file (src/index.ts) in your code editor.
2. Add the following line of code at the beginning of the file:
   ```ts
   declare const process: { env: { NODE_ENV: string } };
   if (process.env.NODE_ENV === 'development')
     new EventSource('/esbuild').addEventListener('change', () =>
       location.reload()
     );
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
