import React from "react";


function Login({ handleLogin }) {
  const [values, setValues] = React.useState({
    email: " ",
    password: " "
  })


  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function onLogin(evt) {
    evt.preventDefault();

    handleLogin(values.email, values.password);
  }

  return (
    <div className="auth__container" onSubmit={onLogin}>
      <p className="auth__welcome">
        Вход
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
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <div className="auth__button-container popup__button">
          <button
            type="submit"
            className="auth__button popup__button">
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;