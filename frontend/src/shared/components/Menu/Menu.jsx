import React from 'react';
import './Menu.scss';
import { MenuElement } from '../MenuElement/MenuElement';

export function Menu(props) {
  return (
    <div className='menu'>
        <MenuElement className="menu__element" text="Курсы"/>
        <MenuElement className="menu__element" text="Добавить курс"/>
        <MenuElement className="menu__element" text="Мой профиль"/>
    </div>
  );
}