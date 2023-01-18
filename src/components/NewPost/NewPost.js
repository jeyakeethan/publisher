import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { listCategories } from '../Service/Service';
import './NewPost.css';

import Article from '../Article/Article';
import { saveArticle } from '../Service/Service';

export default function NewPost(props) {
  const [submitted, setSubmitted] = useState();
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

  if (!submitted) {
    return (
      <div className='new-post-container'>
        <Article
          editMode={true}
          newMode={true}
          setSubmitted={setSubmitted}
          categories={categories}
        />
      </div>

    );
  } else {
    return (
      <div className='new-post-container'>
        <h3>Congratulations! The article has been published.</h3>
      </div>)
  }
}
