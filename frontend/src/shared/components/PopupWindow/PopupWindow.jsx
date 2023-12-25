import React from 'react';
import './PopupWindow.scss';

export function PopupWindow(props) {
  return (
    <>
      {props.open && <div className='popupWindow__overlay'>
        <div className='popupWindow'>
          <div className='popupWindow__title'>{props.title}</div>
          {props.children}
        </div>
      </div>}
    </>
  );
}