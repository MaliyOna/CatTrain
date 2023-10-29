import React, { useEffect, useState } from 'react';
import './RegistrationPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';

export function RegistrationPage() {
    const [test, setTest] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);

    useEffect(() => {
        fetch('/api')
            .then((response) => response.json())
            .then(response => setTest(response.message))
    }, [])

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
                            name="newLogin"
                            rules={{ required: "Required field" }} />

                        <Button value='Вход'/>
                    </div>

                </div>

            </div>

        </div>
    );
}