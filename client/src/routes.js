import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Lancamentos from "./pages/Lancamentos";
import Contato from "./pages/Contato";

import Header from './components/Header';
import Footer from './components/Footer';
import useAuth from './components/useAuth';
import './App.css';


function RoutesApp() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <div className="content-wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<Sobre />} />
                        <Route path="/Lancamentos" element={<Lancamentos />} />
                        <Route path="/Contato" element={<Contato />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default RoutesApp;
