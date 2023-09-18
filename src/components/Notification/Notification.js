import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listArticles } from '../Service/Service';
import './Notification.css';

export default function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const localStorage = window.localStorage;

  const [user, setUser] = useState({});

  useEffect(() => {

    // For demonstration purposes, setting a static array of notifications
    setNotifications([
      { name: 'This is the first notification' },
      { name: 'This is the second notification' },
    ]);

    const userData = localStorage.getItem('auth-token');
    setUser(userData);
  }, []);

  return (
    <div className='notification-container'>
      <ul>
        {notifications.map((item, index) => (
          <li key={index}>
            <Link to={`/notification/${item.name}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
