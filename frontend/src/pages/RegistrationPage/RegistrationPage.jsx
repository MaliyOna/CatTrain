import React, { useEffect, useState } from 'react';
import './RegistrationPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { createUser } from '../../shared/api/authApi';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function RegistrationPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isLoaded, setIsLoader] = useState(false);
    const navigate = useNavigate();

    async function createUserClick(){
        setIsLoader(true);
        if (password !== repeatPassword) {
            toast.error("Не верно повторен пароль");
            setIsLoader(false);
        } else if (login === "" || login === " ") {
            toast.error("Логин не должен быть пустым");
            setIsLoader(false);
        } else if (password === "" || password === " ") {
            toast.error("Пароль не должен быть пустым");
            setIsLoader(false);
        }
        else {
            try {
                const user = {
                    userName: login,
                    password: password
                }
        
                await createUser(user);
            } catch (error) {
                toast.error("Пользователь с таким именем уже существует");
            }
            finally{
                setIsLoader(false);
            }
            
        }
    }

    async function handleNavigateToLogin() {
        navigate(`/login`);
    }

    return (
        <div className='registrationPage'>
            <PageHead></PageHead>

            <div className='registrationPage__elements'>
                <div className='registrationPage__elements__content'>
                    <div className='registrationPage__elements__content__text'>Регистрация</div>

                    <div className='registrationPage__elements__content__block'>
                        <Input
                            label="Логин"
                            type="text"
                            value={login}
                            onChange={(event) => setLogin(event.target.value)}
                            name="newLogin"
                            rules={{ required: "Required field" }} />

                        <Input
                            label="Пароль"
                            type="text"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            name="newPassword"
                            rules={{ required: "Required field" }} />

                        <Input
                            label="Повторите пароль"
                            type="text"
                            value={repeatPassword}
                            onChange={(event) => setRepeatPassword(event.target.value)}
                            name="repeatPassword"
                            rules={{ required: "Required field" }} />

                        <div className='registrationPage__elements__content__block__button'>
                            <div className='registrationPage__button__complete'>
                                <Button onClick={() => createUserClick()} value='Готово'/>
                            </div>

                            <div className='registrationPage__button__login'>
                                <Button onClick={() => handleNavigateToLogin()} value='Вход'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loader show={isLoaded} />
        </div>
    );
}