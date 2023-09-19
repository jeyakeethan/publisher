import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listArticles } from '../Service/Service';
import './Dashboard.css';

import Article from '../Article/Article';

async function getArticlesList(category ) {
  const articles = await listArticles();
  console.log(articles);
  return articles;
}

export default function Dashboard(props) {
  const isCategorized = window.location.pathname.split('/')[1] === 'category';
  const id = useParams().id;
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
    if(isCategorized) {
      listArticles(id).then(data => {
          setArticles(data);
      })
    } else {
      listArticles().then(data => {
        
          setArticles(data);
      })
    }
  }
    return () => mounted = false;
  }, []);

  // const articles = getArticlesList() || {};
  if (!isCategorized && id) {
    const article = articles[id];
    console.log(id);
    console.log(article);
    const articleElement = new Article({article});
    return (
      <div className='dashboard-container'>
        {articleElement.render()}
      </div>
    );
    } else {
      return (
        <div className='dashboard-container'>
          <p className='category-title'>{isCategorized && id.toUpperCase()}</p>
          <ol>
            {articles.map((item,index) => {
              return <li key={item.id} className='item-li'>
                <a className = "item-title" href={"/dashboard/" + index}>
                {item.title} {!isCategorized && <label className='item-title-label'>{"| " + item.category}</label>} 
                </a>
              </li>;
            })}
          </ol>
        </div>
      );
  }
}
