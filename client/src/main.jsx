import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

import './index.scss'
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename="/test">
        <App />
    </BrowserRouter>
);