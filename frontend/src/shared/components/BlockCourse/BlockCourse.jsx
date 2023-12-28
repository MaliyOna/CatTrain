import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlockCourse.scss';

export function BlockCourse(props) {
    const navigate = useNavigate();

    function navigateClick() {
        navigate(props.navigate);
    }

    return (
        <div className='block__course' onClick={() => navigateClick()}>
            <div className='block__course__title'>{props.title}</div>
            <div className='block__course__characteristics'>
                <div className='block__course__characteristics__level'>{props.level}</div>
                <div className='block__course__characteristics__progLanguage'>{props.progLanguage}</div>
            </div>
        </div>
    )
}