import React from "react";
import { graphQlMutation, graphQlQuery, notify } from '@vendure/ui-devkit';
import { Subscription } from 'rxjs';

export class ProductList extends React.Component<{}, { products: any[] }> {
    subscription?: Subscription;

    constructor(props: any) {
        super(props);
        this.state = {products: []};
    }

    getProducts = () => {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = graphQlQuery(`
             query GetProducts($skip: Int, $take: Int) {
                 products(options: { skip: $skip, take: $take }) {
                     items { id, name, enabled },
                     totalItems
                 }
             }
              `, {
            skip: 0,
            take: 10,
        }).stream.subscribe((val: any) => {
                this.setState({products: val.products.items});
            },
            err => console.error(err),
            () => console.log('completed products stream'),
        ) as any;
    }

    toggleEnabled = (id: string, enabled: boolean) => {
        const mutation = `
                mutation ToggleEnabled($id: ID!, $enabled: Boolean!) {
                    updateProduct(input: { id: $id, enabled: $enabled }) {
                        id
                        enabled
                    }
                }
                                `;
        graphQlMutation(mutation, {id, enabled}).then(val => {
            notify({
                message: 'Updated Product',
            });
        });
    }

    componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    render() {
        return <React.Fragment>
            <button className="btn btn-primary" onClick={this.getProducts}>Get products</button>
            {
                this.state.products.length ? <h3>Products</h3> : ''
            }
            <ol className="product-list">
                {this.state.products.map(product => <li key={product.id}>
                    {product.name}
                    {product.enabled ? <span className="label label-success">Enabled</span> :
                        <span className="label label-danger">Disabled</span>}
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => this.toggleEnabled(product.id, !product.enabled)}
                    >
                        toggle
                    </button>
                </li>)}
            </ol>
        </React.Fragment>
    }
}
