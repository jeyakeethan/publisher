
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { listCategories } from '../Service/Service';
import './Sidebar.css';

import Article from '../Article/Article';

export default function Sidebar(props) {

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let mounted = true;
    listCategories().then(data => {
      if (mounted) {
        setCategories(data)
      }
    })
    return () => mounted = false;
  }, []);
  console.log(categories);
  const menuList = ["Dashboard", "Notifications"];
  return (
    <div>
      <div className='menu-container'>
        <ul className='menu'>
          <li className='new-post-btn'>
            <a href={"/newpost"}>
              New Post
            </a>
          </li>
          {menuList.map(function (name, index) {
            return <li key={index}>
              <a href={"/" + name.toLowerCase()}>
                {name}
              </a>
            </li>;
          })}
        </ul>
      </div>
      <div className='category-container'>
        <label className='category-label'>Categories</label>
        <ul className='category'>
          {categories.map(function (name, index) {
            return <li key={index}>
              <a href={"/category/" + name.toLowerCase()}>
                {name}
              </a>
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
}