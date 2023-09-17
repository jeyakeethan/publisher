import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listArticles } from '../Service/Service';
import './Notification.css';



export default function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const localStorage = window.localStorage;

  const [user, setUser] = useState({});
  useEffect(() => {
    const user = localStorage.getItem('auth-token');
    setUser(user);
    setNotifications([{'name':'this is first notification'}, {'name':'this is second notification'}]);
  });
  
  
  console.log(user);

    return (
      <div className='notification-container'>
        <ul className=''>
          {notifications.forEach(item => {
            return <li>
              <a href={"/notification/" + item.name}>
                {item.name}
              </a>
            </li>;
          })}
        </ul>
      </div>
    );
}
