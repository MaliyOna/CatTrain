import React from 'react';
import './MenuElement.scss';
import { useNavigate } from 'react-router-dom';

export function MenuElement(props) {
    const navigate = useNavigate();

    function handleClick(){
        navigate(`${props.address}`);
    }

    return (
        <div className='menuElement' onClick={() => handleClick()}>
            {props.text}
        </div>
    );
}