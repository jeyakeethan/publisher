import React from 'react';
import './Dashboard.css';

import Article from '../Article/Article';
let articles = {};
fetch('http://localhost:8081/articles/list')
  .then(response => response.json())
  .then(data => { articles = data; });

export default function Dashboard(props) {
  const user = JSON.parse(localStorage.getItem('auth-token'));
  console.log(user.firstName);
  return (
    <div>
      <div className='welcome-note-wrapper'>
        <h6>Welcome {user.firstName},</h6>
      </div>

      <div>
        <div className='sidebar'></div>
        <Article
          article={articles[0]}
          editMode={false}
        />
      </div>
    </div>
  );
}
