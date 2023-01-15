
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import './Sidebar.css';

import Article from '../Article/Article';

let list = {}

fetch('http://localhost:8081/article/categories')
  .then(response => response.json())
  .then(data => {
    list = data;
  });

export default function Sidebar(props) {

  const [categories, setCategories] = useState(list);
  const menuList = ["Dashboard", "Notifications"];
  return (
    <div className='categories-container'>
      <ul className='menu'>
        <BrowserRouter>
          {menuList.map(function (name, index) {
            return <li key={index}>
              <a href={"/" + name.toLowerCase()}>
                {name}
              </a>
            </li>;
          })}
        </BrowserRouter>
      </ul>
    </div>
  );
}