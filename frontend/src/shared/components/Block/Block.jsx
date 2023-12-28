import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Block.scss';

export function Block(props) {
    const navigate = useNavigate();

    function navigateClick() {
        navigate(props.navigate);
    }

    return (
        <div className='block' onClick={() => navigateClick()}>
            <div className='block__title'>{props.title}</div>
        </div>
    )
}