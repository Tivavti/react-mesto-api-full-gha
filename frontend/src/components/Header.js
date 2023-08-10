import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg'

function Header({ setLoggedIn, userEmail, handleLogout }) {

  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="Логотип." />
      <Routes>
        <Route exact path="/" element={
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <button
              className="header__button-container"
              type="button"
              onClick={handleLogout}
            ><Link to="/signin" className="header__button">Выйти</Link></button></div>} />
        <Route path="/signup" element={
          <button
            className="header__button"
            type="button"
          ><Link to="/signin" className="header__button header__button-form">Войти</Link></button>} />
        <Route path="/signin" element={
          <button
            className="header__button"
            type="button"
          ><Link to="/signup" className="header__button header__button-form">Регистрация</Link></button>} />

      </Routes>
    </header>
  )
}

export default Header;