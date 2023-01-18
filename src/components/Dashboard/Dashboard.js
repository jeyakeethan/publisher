import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listArticles } from '../Service/Service';
import './Dashboard.css';

import Article from '../Article/Article';

async function getArticlesList() {
  const articles = await listArticles();
  console.log(articles);
  return articles;
}

export default function Dashboard(props) {

  const articles = getArticlesList() || {};
  const id = useParams().id;
  if (id) {
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
          <ul className='menu'>
            {articles.map((item,index) => {
              return <li key={item.id}>
                <a href={"/dashboard/" + index}>
                  {item.title}
                </a>
              </li>;
            })}
          </ul>
        </div>
      );
  }
}
