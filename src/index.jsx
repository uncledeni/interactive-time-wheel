import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app.jsx';
import './shared/fonts/fonts.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    *, *::after, *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>
);