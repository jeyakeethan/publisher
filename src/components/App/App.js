import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Notification from '../Notification/Notification';
import Sidebar from '../Sidebar/Sidebar';
import Signup from '../Signup/Signup';
import NewPost from '../NewPost/NewPost';
import Preferences from '../Preferences/Preferences';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import logo from '../../images/logo.svg';
import { FiLogOut } from 'react-icons/fi';

function App() {
  const [token, setToken] = useState();

  if (!token && localStorage.getItem('auth-token')) {
    console.log(localStorage.getItem('auth-token'));
    setToken(JSON.parse(localStorage.getItem('auth-token')));
  }

  if (!token) {
    console.log(window.location.pathname);
    if (window.location.pathname === '/signup') {
      return (
        <div>
          <div className='app-header'>
            <span>Publisher</span>
          </div>
          <Signup />
        </div>
      );
    }
    return <Login setToken={setToken} />
  }

  const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
  }

  const user = token;

  return (
    <div className="wrapper">
      <div className='app-header'>
        <span>Publisher</span>
        <FiLogOut className='logout-btn' onClick={logout} />
      </div>
      <div className='welcome-note-wrapper'>
        <h6>Welcome {user.firstName} {user.lastName}</h6>
      </div>
      <div className='main-container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='container'>
          <BrowserRouter>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/dashboard/:id" element={<Dashboard />} />
              <Route exact path="/category/:id" element={<Dashboard />} />
              <Route exact path="/notifications" element={<Notification />} />
              <Route exact path="/newpost" element={<NewPost />} />
              <Route path="/preferences" element="{<Preferences/>}" />
              {/* <Route path='*' element={<Navigate to="/" />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
