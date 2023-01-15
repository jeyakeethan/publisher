import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import Article from '../Article/Article';

export function signup(user) {
  console.log(JSON.stringify(user));
  let outcome = fetch('http://localhost:8081/user/signup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    // It should be encrypted using a public key
    body: JSON.stringify(user)
  }).then(
    (data) => {
      if (data.status === 200) {
        return true;
      }
      return false;
    }
  )
  return outcome;
}

export async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));
  return fetch('http://localhost:8081/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

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
