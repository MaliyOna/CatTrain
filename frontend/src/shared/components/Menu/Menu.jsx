import React, { useEffect, useState } from 'react';
import './Menu.scss';
import { MenuElement } from '../MenuElement/MenuElement';
import { getRole } from '../../api/authApi';

export function Menu() {
  const [role, setRole] = useState();

  useEffect(() => {
    loadRole();
  }, [])

  async function loadRole() {
    const data = await getRole(localStorage.getItem('userName'));

    setRole(data.data.role);

    console.log(data);
  }

  return (
    <div className='menu'>
      {role && role == "ADMIN" && <MenuElement className="menu__element" text="Фабрика курсов" address="/factorycourses" />}
      <MenuElement className="menu__element" text="Курсы" address="/courses" />
      <MenuElement className="menu__element" text="Мой профиль" address="/userProfile" />
    </div>
  );
}