import React, { useState }  from 'react';
import './Dashboard.css';

import Article from '../Article/Article';

let list = {}
fetch('http://localhost:8081/article/list')
  .then(response => response.json())
  .then(data => {
    list = data;
  });

export default function Dashboard(props) {

  const [articles, setArticles] = useState(list);
  console.log(list);
  return (
    <div className='dashboard-container'>
      <Article
          article={articles[0]}
          editMode={false}
        />
    </div>

  );
}
