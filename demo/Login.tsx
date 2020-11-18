import React from 'react';
import useSwitch from '..';

export default function Login() {
  const [authContainer, setAuth, LOGIN, REGISTER, RESET_PASSWORD] = useSwitch(
    { name: 'auth' },
    'login',
    'register',
    'reset-password'
  );

  return (
    <form
      className="tygr-login"
      {...authContainer}
      onSubmit={(ev) => ev.preventDefault()}
    >
      <div className="header">
        <button
          onClick={setAuth('login')}
          type="button"
          className={LOGIN ? 'selected' : ''}
        >
          Login
        </button>
        <button
          onClick={setAuth('register')}
          type="button"
          className={REGISTER ? 'selected' : ''}
        >
          Register
        </button>
        <button
          onClick={setAuth('reset-password')}
          type="button"
          className={RESET_PASSWORD ? 'selected' : ''}
        >
          Reset Password
        </button>
      </div>

      <label htmlFor="email">Email Address</label>
      <input required id="email" type="text" />

      <label htmlFor="password" data-auth="!reset-password">
        Password
      </label>
      <input
        required={LOGIN || REGISTER}
        id="password"
        data-auth="!reset-password"
        type="password"
      />

      <label htmlFor="confirm-password" data-auth="register">
        Confirm Password
      </label>
      <input
        required={REGISTER}
        id="confirm-password"
        data-auth="!login !reset-password"
        type="password"
      />

      <input data-auth="login" type="submit" value="Login" />
      <input data-auth="register" type="submit" value="Register" />
      <input data-auth="reset-password" type="submit" value="Reset password" />
    </form>
  );
}
