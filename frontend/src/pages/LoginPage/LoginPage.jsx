import React, { useEffect, useState } from 'react';
import './LoginPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { loginUser } from '../../shared/api/authApi';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [])

    async function loginUserClick(){
        const user = {
            userName: login,
            password: password
        }

        const data = await loginUser(user);
        console.log(data);
    }

    async function handleNavigateToRegistration() {
        console.log(1)
        navigate(`/registration`);
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

                        <div className='registrationPage__elements__content__block__button'>
                            <div className='registrationPage__button__complete'>
                                <Button onClick={() => handleNavigateToRegistration()} value='Регистрация'/>
                            </div>

                            <div className='registrationPage__button__login'>
                                <Button onClick={() => loginUserClick()} value='Вход'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}