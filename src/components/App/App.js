import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulate an asynchronous check for an existing token
  useEffect(() => {
    const checkToken = async () => {
      // Simulate an API call or local storage retrieval
      const storedToken = localStorage.getItem('auth-token');
      if (storedToken) {
        setToken(JSON.parse(storedToken));
      } else {
        // Redirect to the login page when no token is available
        navigate('/login');
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
    // Redirect to the login page
    navigate('/login');
  }

  if (loading) {
    // Render a loading indicator while checking for the token
    return <div>Loading...</div>;
  }

  // Determine if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="wrapper">
      {token && !isLoginPage && (
        <div className='app-header'>
          <span>Publisher</span>
          <FiLogOut className='logout-btn' onClick={logout} />
        </div>
      )}
      {token && !isLoginPage && (
        <div className='welcome-note-wrapper'>
          <h6>Welcome {token.firstName} {token.lastName}</h6>
        </div>
      )}
      {token && !isLoginPage && (
        <div className='main-container'>
          <div className='sidebar'>
            <Sidebar />
          </div>
          <div className='container'>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<Dashboard />} />
              <Route path="/category/:id" element={<Dashboard />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/newpost" element={<NewPost />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path='*' element={() => { navigate('/dashboard'); return null; }} />
            </Routes>
          </div>
        </div>
      )}
      {!token || isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : null}
    </div>
  );
}

export default App;
