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
    return (
      <div className='dashboard-container'>
        <Article
          article={article}
        />
      </div>
    );
    } else {
      return (
        <div className='dashboard-container'>
          <ol>
            {articles.map((item,index) => {
              return <li key={item.id}>
                <a href={"/dashboard/" + index}>
                  {item.title}
                </a>
              </li>;
            })}
          </ol>
        </div>
      );
  }
}
