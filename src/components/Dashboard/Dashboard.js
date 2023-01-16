import React, { useState, useEffect }  from 'react';
import {listArticles} from '../Service/Service';
import './Dashboard.css';

import Article from '../Article/Article';


export default function Dashboard(props) {
  const [articles, setArticles] = useState({});
  useEffect(() => {
    let mounted = true;
    listArticles('').then(data => {
        if(mounted) {
          setArticles(data)
        }
      })
    return () => mounted = false;
  }, []);
  const article = articles[0];
  console.log(articles);
  return (
    <div className='dashboard-container'>
      <Article
          article={article}
        />
    </div>
  );
}
