// src/components/Header/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './style.css';
import useAuth from '../useAuth';

function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header>
      <nav className="navbar">
        <Link to="#" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <ul className="menu">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/sobre" className="nav-link">Sobre</Link></li>
          <li className="nav-item"><Link to="/lancamentos" className="nav-link">Promoções</Link></li>
          <li className="nav-item"><Link to="/contato" className="nav-link">Contato</Link></li>
        </ul>
        <div className="user-info">
          {user ? (
            <div className="user-info-authenticated">
              <span className="login-button">Bem-vindo, {user.displayName}</span>
              <button className="logout-button" onClick={logout}>Sair</button>
            </div>
          ) : (
            <button className="login-button" onClick={login}>Login</button>
          )}
        </div>
        <div className="px-3 geral">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;