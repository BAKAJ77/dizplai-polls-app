import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import VotingPage from './pages/voting'
import ConfirmationPage from './pages/confirmation'
import InvalidPage from './pages/invalid_page'

import './index.css'
import logo from './assets/logo.png'

function BasePageLayout() // The parent layout of each page, used only to render the logo and background for all pages
{
    return (
            <>
            <Link to="/">
                <img id="logo" alt="logo" src={logo} />
            </Link>
            <Outlet />
            </>
    );
}

function App()
{
    // Here we define the URL paths for each page in this web app
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BasePageLayout />}>
                    <Route index element={<VotingPage />} />
                    <Route path="confirmed" element={<ConfirmationPage />} />
                    <Route path="*" element={<InvalidPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);