import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlockCourse.scss';

export function BlockCourse(props) {
    const navigate = useNavigate();

    function navigateToCreateUpdatePage() {
        navigate(`/courses/${props._id}`);
    }

    return (
        <div className='block__course' onClick={() => navigateToCreateUpdatePage()}>
            <div className='block__course__title'>{props.title}</div>
            <div className='block__course__characteristics'>
                <div className='block__course__characteristics__level'>{props.level}</div>
                <div className='block__course__characteristics__progLanguage'>{props.progLanguage}</div>
            </div>
        </div>
    )
}