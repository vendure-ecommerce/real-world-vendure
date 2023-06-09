import React from 'react';
import './App.css';
import { ProductList } from './ProductList';

function App() {
    return (
        <div className="page-block">
            <h1>Hello from React!</h1>
            <p>
                This is a demonstration of how Admin UI extensions can be created using any web framework, and
                interoperate seamlessly with the Angular-based host application.
            </p>
            <ProductList />
        </div>
    );
}

export default App;
