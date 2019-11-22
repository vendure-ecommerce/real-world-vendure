import gql from 'graphql-tag';

export const GET_PRODUCT_NAME = gql`
    query GetProductName($id: ID!) {
        product(id: $id) {
            id
            name
        }
    }
`;
