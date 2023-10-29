import React from 'react';
import './PageHead.scss';
import { useNavigate } from 'react-router-dom';

export function PageHead() {
  const navigate = useNavigate();

  function handleLogoutClick() {
    navigate(`/login`);
  }

  return (
    <div className='pageHead'>
      <div className='pageHead__text'>
        CatTrain
      </div>
    </div>
  );
}