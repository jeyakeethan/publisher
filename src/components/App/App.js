import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../Sidebar/Sidebar';
import Article from '../Article/Article';
import Preferences from '../Preferences/Preferences';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import logo from '../../images/logo.svg';
import {FiLogOut} from 'react-icons/fi';

function App() {
  const [token, setToken] = useState();
  if (!token && localStorage.getItem('auth-token')) {
    console.log(localStorage.getItem('auth-token'));
    setToken(JSON.parse(localStorage.getItem('auth-token')));
  }

  if (!token) {
    return <Login setToken={setToken} />
  }

  const user = JSON.parse(localStorage.getItem('auth-token'));
  console.log(user.firstName);

  const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null)
  }

  return (
    <div className="wrapper">
      <div className='app-header'>
        <span>Publisher</span>
        <FiLogOut className='logout-btn' onClick={logout}/>
      </div>
      <div className='welcome-note-wrapper'>
        <h6>Welcome {user.firstName},</h6>
      </div>
      <div className='main-container'>
        <div className='sidebar'>
          <Sidebar/>
        </div>
        <div className='container'>
          <Dashboard />
          {/* <BrowserRouter>
            <Routes>
              <Route path="/dashboard"> {Dashboard} </Route>
              <Route path="/preferences" element="{<Preferences/>}" />
            </Routes>
          </BrowserRouter> */}
        </div>
      </div>
    </div>
  );
}

export default App;
