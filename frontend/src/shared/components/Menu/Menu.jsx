import React from 'react';
import './Menu.scss';
import { MenuElement } from '../MenuElement/MenuElement';

export function Menu(props) {
  return (
    <div className='menu'>
        <MenuElement className="menu__element" text="Фабрика курсов" address="/factorycourses"/>
        <MenuElement className="menu__element" text="Курсы" address="/courses"/>
        <MenuElement className="menu__element" text="Мой профиль" address="/profile"/>
    </div>
  );
}