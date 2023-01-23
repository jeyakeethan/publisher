import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import Article from '../Article/Article';
const server = 'http://localhost:8081';
// const server = 'http://publishertomcatcontainer-env.eba-rgtzqate.us-east-1.elasticbeanstalk.com';

export function signup(user) {
  console.log(JSON.stringify(user));
  let outcome = fetch(server + '/user/signup', {
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

export function login(credentials) {
  console.log(JSON.stringify(credentials));
  return fetch(server + '/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export function listCategories() {
  return fetch(server + '/category/list')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data
    });
}

export function listArticles(category = '') {
  let url = "";
  if (category === '') {
    url = server + '/article/list';
  } else {
    url = server + '/category/' + category;
  }
  const articles = fetch(url)
    .then(response => response.json())
    .then(data => {
      // const articleMap = {};
      // data.array.forEach(element => {
      //   articleMap[element.id] = element;
      // });
      console.log(data);
      return data;
    });
    return articles;
}

function callSaveArticle(operation, article) {
  console.log(JSON.stringify(article));
  let outcome = fetch(server + '/article/save?operation=' + operation, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
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

export function publishArticle(article) {
  return callSaveArticle("", article);
}

export function updateTitle(article) {
  console.log(JSON.stringify(article));
  fetch(server + '/article/save?operation=title', {
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
  fetch(server + '/article/save?operation=content', {
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
  fetch(server + '/article/save?operation=read-time', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(article)
  })
}

export function subcribeAuthor(username, author) {
  let outcome = fetch(server + '/subsciption/save?operation=read-time', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ username, author })
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
