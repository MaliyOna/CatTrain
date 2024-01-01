import React, { useState } from 'react';
import './LoginPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { loginUser } from '../../shared/api/authApi';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoaded, setIsLoader] = useState(false);
    const navigate = useNavigate();

    async function loginUserClick() {
        setIsLoader(true);

        if (login === "" || login === " ") {
            toast.error("Логин не должен быть пустым");
            setIsLoader(false);
        }
        else if (password === "" || password === " ") {
            toast.error("Пароль не должен быть пустым");
            setIsLoader(false);
        }
        else{
            try {
                const user = {
                    userName: login,
                    password: password
                }
    
                const data = await loginUser(user);
    
                if (data.status === 200) {
                    localStorage.setItem("userName", login);
                    navigate(`/mainpage`);
                }
            } catch (error) {
                toast.error("Не верное имя пользователя или пароль");
            }
            finally {
                setIsLoader(false);
            }
        }
    }

    async function handleNavigateToRegistration() {
        navigate(`/registration`);
    }

    return (
        <div className='loginPage'>
            <PageHead></PageHead>

            <div className='loginPage__elements'>
                <div className='loginPage__elements__content'>
                    <div className='loginPage__elements__content__text'>Вход</div>

                    <div className='loginPage__elements__content__block'>
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

                        <div className='loginPage__elements__content__block__button'>
                            <div className='loginPage__button__complete'>
                                <Button onClick={() => handleNavigateToRegistration()} value='Регистрация' />
                            </div>

                            <div className='loginPage__button__login'>
                                <Button onClick={() => loginUserClick()} value='Вход' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Loader show={isLoaded} />
        </div>
    );
}