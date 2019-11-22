# real-world-vendure

This repo demonstrates a real-world Vendure server. It was generated with [`@vendure/create`](https://github.com/vendure-ecommerce/vendure/tree/master/packages/create), but adds extra tooling and includes some example real-world plugins.

## Tooling

### [eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
These are tools for finding and fixing common code issues and formatting your code in a standard way. Run `yarn lint:fix` to lint and format your code.

## Plugins

### Braintree Plugin

This is a working implementation for the Braintree payment provider. It demonstrates how a typical `PaymentMethodHandler` is used. The basic pattern will be similar for other modern payment processors such as Stripe or PayPal. See the [Braintree plugin readme](./src/plugins/braintree/README.md) for more information.


## Directory structure

* `/src` contains the source code of your Vendure server. All your custom code and plugins should reside here.
* `/static` contains static (non-code) files such as assets (e.g. uploaded images) and email templates.

## Development

```
yarn start
```

will start the Vendure server and [worker](https://www.vendure.io/docs/developer-guide/vendure-worker/) processes from
the `src` directory.

## Build

```
yarn build
```

will compile the TypeScript sources into the `/dist` directory.

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
