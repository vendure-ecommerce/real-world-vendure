# Reviews Plugin

The reviews plugin add product reviews to Vendure.

This plugin demonstrates many capabilities of the Vendure plugin system:

* Creation of new database entities (see [./entities](./entities))
* Extension of the GraphQL APIs with new types, extensions of existing types, new queries and new mutations (see [./graphql/api-extensions.ts](./graphql/api-extensions.ts))
* Implementation of custom resolvers for those GraphQL extensions (e.g. [./graphql/product-entity.resolver.ts](./graphql/product-entity.resolver.ts))
* Modifying the VendureConfig to add CustomFields (see [./reviews-plugin.ts](./reviews-plugin.ts))
* Extending the Admin UI with custom UI components for those CustomFields and a lazy-loaded module to administer the reviews. 
