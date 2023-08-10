import React from "react";
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
  const [values, setValues] = React.useState({
    email: " ",
    password: " "
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function onRegister(evt) {
    evt.preventDefault();

    handleRegister(values.email, values.password);
  }

  return (
    <div className="auth__container" onSubmit={onRegister}>
      <p className="auth__welcome">
        Регистрация
      </p>
      <form className="auth__form">
        <input
          onChange={handleChange}
          value={values.email}
          required
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={values.password}
          required
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <div className="auth__button-container popup__button">
          <button
            type="submit"
            className="auth__button popup__button">
            Зарегистрироваться
          </button>
          <p className="auth__link">Уже зарегистрированы?
            <Link to="/signin" className="auth__link button"> Войти</Link></p>
        </div>
      </form >
    </div>
  )
}

export default Register;