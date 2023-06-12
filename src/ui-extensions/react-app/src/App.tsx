import React from 'react';
import './App.css';
import { ProductListTable } from './ProductList';

function App() {
    return (
        <div className="page-block">
            <h1>Hello from React!</h1>
            <p style={{ marginBottom: '32px', maxWidth: '600px' }}>
                This is a demonstration of how Admin UI extensions can be created using any web framework, and
                interoperate seamlessly with the Angular-based host application.
            </p>
            <ProductListTable />
        </div>
    );
}

export default App;
