import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../Service/Service';
import './Login.css';

import bcrypt from 'bcryptjs';

async function loginUser(credentials) {
  console.log(credentials);
  if (credentials.username == null || credentials.password == null) {
    return "Please fill all required fields";
  }
  const salt = "$2a$10$CwTycUXWue0Thq9StjUM0u";
  credentials.password = bcrypt.hashSync(credentials.password, salt);
  console.log(credentials);
  const token = await login(credentials);

  return token;
}

export default function Login({ setToken }) {
  console.log("Login page")
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const localStorage = window.localStorage;
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const salt = "$2a$10$CwTycUXWue0Thq9StjUM0u";
    const token = await loginUser({
      "username": username,
      "password": password
    });
    if (token.username) {
      localStorage.setItem('auth-token', JSON.stringify(token), { token });
      console.log('User login successful!');
      setToken(token);
      navigate('/dashboard');
    } else {
      console.log('User login failure!');
    }
  }

  return (
    <div>
      <div className='login-wrapper'>
        <h1 className='login-title'>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span className='login-label'>Username</span>
            <input className='input-field' type='text' name='username' onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <span className='login-label'>Password</span>
            <input className='input-field' type='password' name='password' onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button className='submit-button' type='submit'>Login</button>
          </div>
        </form>
        <a href="/signup">Create new account</a>
      </div>
      <div className='login-note'>
        <p>login: admin admin</p>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

