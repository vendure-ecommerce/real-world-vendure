import React from 'react';
import '@vendure/admin-ui/static/theme.min.css';
import './App.css';
import { ProductList } from './ProductList';

function App() {
    return (
        <div className="App">
            <h1>Hello from React!</h1>
            <p>This is a demonstration of how Admin UI extensions can be created using any web framework, and
                interoperate
                seamlessly with the Angular-based host application.</p>
            <ProductList />
        </div>
    );
}

export default App;
