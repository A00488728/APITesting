import React from 'react';
import ReactDOM from 'react-dom/client'; // for React 18 and later
import './index.css'; // Optional, for global styles
import App from './App'; // The main component of your app

// React 18 style root rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main app component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
