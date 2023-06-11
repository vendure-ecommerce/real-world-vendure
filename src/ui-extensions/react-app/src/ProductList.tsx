import React, { useEffect, useState } from 'react';
import { graphQlMutation, graphQlQuery, notify } from '@vendure/ui-devkit';

function onToggle(id: string, enabled: boolean) {
    graphQlMutation(
        `mutation ToggleEnabled($id: ID!, $enabled: Boolean!) {
            updateProduct(input: { id: $id, enabled: $enabled }) {
                id
                enabled
            }
        }`,
        { id, enabled },
    ).then(
        () => notify({ message: 'Updated Product' }),
        reason => notify({ message: 'Couldnt update product.', type: 'error' }),
    );
}

// FYI: For more complex apps you should prefer importing generated types.
type Products = {
    products: {
        totalItems: number;
        items: Array<{
            id: string;
            name: string;
            enabled: boolean;
        }>;
    };
};

export const ProductListTable = () => {
    const [products, setProducts] = useState<Products>();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const subscription = graphQlQuery<Products, object>(
            `
             query GetProducts($skip: Int, $take: Int) {
                 products(options: { skip: $skip, take: $take }) {
                     items { id, name, enabled },
                     totalItems
                 }
             }
              `,
            {
                skip: 0,
                take: 10,
            },
        ).stream.subscribe({
            next: setProducts,
            error: () => setHasError(true),
            complete: () => console.log('COMPLETE'),
        });

        // Cleanup
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (hasError) {
        return <h3>Error: Could not fetch products.</h3>;
    }

    if (products === undefined) {
        return <h4>Loading products...</h4>;
    }

    return products?.products.items.length ? (
        <>
            <h3>
                Found {products?.products.totalItems} products, showing {products?.products.items.length}:
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Toggle</th>
                        <th>State</th>
                        <th>Product</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.products.items.map((p, i) => (
                        <tr key={i}>
                            <td>
                                <button className="button-ghost" onClick={() => onToggle(p.id, !p.enabled)}>
                                    Toggle
                                </button>
                            </td>
                            <td>
                                {p.enabled ? (
                                    <span className="label label-success">Enabled</span>
                                ) : (
                                    <span className="label label-danger">Disabled</span>
                                )}
                            </td>
                            <td>
                                <a
                                    href={`/admin/catalog/inventory/${p.id}`}
                                    target="_blank"
                                    className="button-ghost"
                                >
                                    {p.name}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        width="1em"
                                        height="1em"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : (
        <h3>Coudldn't find products.</h3>
    );
};
