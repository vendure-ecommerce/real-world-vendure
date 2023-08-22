# Real World Vendure

This project demonstrates a real-world [Vendure](https://www.vendure.io/) server setup. It was generated with [`@vendure/create`](https://github.com/vendure-ecommerce/vendure/tree/master/packages/create), but adds extra tooling and includes some example real-world plugins.

![Screenshot of the Admin UI product details page with reviews](./product-reviews-screenshot.webp)

## Getting Started

1. Clone this repo
2. `yarn` to install dependencies (using [Yarn v1.x](https://classic.yarnpkg.com))
3. `yarn populate` to populate the database with some sample data
4. In the `/src/ui-extensions/react-app` directory, run `yarn` and then `yarn build`
5. In the `/src/ui-extensions/vue3-app` directory, run `yarn` and then `yarn build`
6. In the root dir, run `yarn build` to build the application 
7. Run `yarn start` to start the Vendure server
8. Login to [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login) with the default [`@vendure/create`](https://www.vendure.io/docs/getting-started/#installation-with-@vendure/create) credentials (username `superadmin`, password `superadmin`).

## Tooling

### [eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
These are tools for finding and fixing common code issues and formatting your code in a standard way. Run `yarn lint:fix` to lint and format your code.

### [vitest](https://vitest.dev/)
Vitest is a testing framework used in the plugin end-to-end tests. Testing in Vendure is covered in our [testing guide](https://docs.vendure.io/developer-guide/testing/).

End-to-end tests for the reviews plugin are run with `yarn e2e:reviews`

### [graphql-code-generator](https://graphql-code-generator.com/)
This is used to generate TypeScript types based on the Vendure server's GraphQL APIs. It is used to automatically generate correct types for plugin resolvers and plugin e2e tests. This ensures that whenever a schema is changed or a CustomField added, new typings can be generated to make sure your resolvers and tests are correct. 

Whenever a change to the GraphQL API is made either by a plugin schema extension or by the definition of CustomFields, run `yarn codegen` to update the TypeScript definitions (make sure the server is running locally at the same time).

## Plugins

### Reviews Plugin

This plugin adds the capability for customers to create product reviews which can then be used to display product ratings.

The plugin showcases several advanced capabilities of the Vendure plugin system. See the [reviews plugin readme](./src/plugins/reviews/README.md) for more information.

## UI Extensions

This repo also demonstrates several approaches to extending the Admin UI:

* Angular-based ui extensions in the [reviews plugin](./src/plugins/reviews/ui)
* A React-based, [compiled ui extension](./src/ui-extensions/react-app) build with Create React App
* A Vue-based, [uncompiled ui extension](./src/ui-extensions/vue-app)

## Directory structure

* `/src` contains the source code of your Vendure server. All your custom code and plugins should reside here.
* `/static` contains static (non-code) files such as assets (e.g. uploaded images) and email templates.
* `/migrations` contains database migration scripts (see migrations section below).

## Development

```
yarn start
```

will start the Vendure server and [worker](https://www.vendure.io/docs/developer-guide/vendure-worker/) processes from
the `src` directory. Note - the first time you run this the custom UI extensions of the reviews plugin will be compiled which may take a few minutes. Subsequent runs will be much faster (providing the UI extensions of the reviews plugin do not change).

## Build & deploy

```
yarn build
```

will compile the TypeScript sources into the `/dist` directory and compile the custom Admin UI app into the `/admin-ui` directory.

Then to run in production, the files `/dist/index.js` & `/dist/index-worker.js` should be run in Node. 

## Migrations

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) allow safe updates to the database schema.

The following npm scripts can be used to generate migrations:

```
yarn migration:generate [name]
```

run any pending migrations that have been generated:

```
yarn migration:run
```

and revert the most recently-applied migration:

```
yarn migration:revert
```
