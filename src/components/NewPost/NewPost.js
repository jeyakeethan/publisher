import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './NewPost.css';

import Article from '../Article/Article';
import { saveArticle } from '../Service/Service';

export default function NewPost(props) {
  const [submitted, setSubmitted] = useState();

  if (!submitted) {
    return (
      <div className='new-post-container'>
        <Article
          editMode={true}
          newMode={true}
          setSubmitted={setSubmitted}
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
