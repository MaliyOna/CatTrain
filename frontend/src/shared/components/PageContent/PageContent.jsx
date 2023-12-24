import React from 'react';
import './PageContent.scss';

export function PageContent(props) {
  return (
    <div className='pageContent'>
        {
        props.children
        }
    </div>
  );
}