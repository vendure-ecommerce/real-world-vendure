# React-based UI Extension

Here's an example of a simple UI extension built with React, and is based on Create React App.

There are a few modification required to get the app working as a UI extension:

1. Set `SKIP_PREFLIGHT_CHECK=true` in an .env file. This required because the preflight check complains about the version of Webpack in the root node_modules.
2. Set the "homepage" in package.json to `"/admin/assets/react-app/"`. This is because at run-time, the React app will be copied over to a sub-directory as specified in 
3. Set `PORT=3080` so that the dev server does not conflict with the Vendure server.

### Instructions

1. Install dependencies in this directory:

    ```bash
    yarn install
    ```
2. Build the app:

    ```bash
    yarn build
    ```
   
3. Start the Vendure server from the root directory:

    ```bash
    yarn start
    ```
