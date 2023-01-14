import React, { useState }  from 'react';
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
  console.log(getCategoriesElements(categories));
  return (
    <ul element='categories-container'>
      {getCategoriesElements(categories)}
    </ul>
  );
}

function getCategoriesElements(list) {
  console.log(list);
  {list.map((item,index)=>{
    return <li key={index}>{item}</li>
})}
}