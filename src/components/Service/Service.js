import React, { useState } from 'react';

import Article from '../Article/Article';


export function listArticles(category = "") {
  fetch('http://localhost:8081/article/list' + category)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

export function saveArticle(article) {
  console.log(JSON.stringify(article));
  fetch('http://localhost:8081/article/save', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export function updateTitle(article) {
  console.log(JSON.stringify(article));
  fetch('http://localhost:8081/article/save?operation=title', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export function updateContent(article) {
  console.log(JSON.stringify(article));
  fetch('http://localhost:8081/article/save?operation=content', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export function updateReadTime(article) {
  console.log(JSON.stringify(article));
  fetch('http://localhost:8081/article/save?operation=read-time', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
  })
}
