import React from 'react';

let article = {}

export default function Article() {
  return(
    <div className='style-wrapper'>
        <h2>{article.title}</h2>
        <div className='body-content'>
            <text>
                {article.content}
            </text>
        </div>
    </div>

  );
}