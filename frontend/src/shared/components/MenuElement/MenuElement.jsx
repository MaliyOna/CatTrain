import React from 'react';
import './MenuElement.scss';

export function MenuElement(props) {
  return (
    <div className='menuElement'>
        {props.text}
    </div>
  );
}