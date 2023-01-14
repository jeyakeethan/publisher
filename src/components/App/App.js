import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Article from '../Article/Article';
import Preferences from '../Preferences/Preferences';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import logo from '../../images/logo.svg';


function App() {
  const [token, setToken] = useState();
  // if (localStorage.getItem('auth-token')) {
  //   console.log(localStorage.getItem('auth-token'));
  //   setToken(localStorage.getItem('auth-token'));
  // }

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <div className='app-header'>Publisher</div>
      <Dashboard />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element="{Dashboard}" />
          <Route path="/preferences" element="{<Preferences/>}" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
