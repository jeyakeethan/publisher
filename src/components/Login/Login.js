import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));
  return fetch('http://localhost:8081/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      "username": username,
      "password": password
    });
    localStorage.setItem('auth-token', JSON.stringify(token), { token });
    console.log('User login successful!');
    setToken(token);
  }

  return (
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
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

