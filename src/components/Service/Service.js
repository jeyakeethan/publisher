import React, { useState }  from 'react';

import Article from '../Article/Article';

export function saveArticle(article) {
  console.log(JSON.stringify(article));
  fetch('http://localhost:8081/article/save', {
     method: 'POST',
     headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
     },
     body: JSON.stringify(article)
   }).then(data => data.json())
  }

export default class Service {
    

}
