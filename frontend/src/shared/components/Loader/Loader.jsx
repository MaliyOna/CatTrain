import React from 'react';
import loaderCat from '../../../assets/loaderCat.svg'
import './Loader.scss';

export function Loader(props) {
  return (
    <>
      {
        props.show
          ? <div className='loader__overlay'>
            <img src={loaderCat} />
          </div>
          : null
      }
    </>
  );
}