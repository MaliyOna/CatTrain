import React, { useEffect, useState } from 'react';
import './Block.scss';

export function Block(props) {
    if (props.type === "course") {
        return (
            <div className='block__course'>
                <div className='block__course__title'>{props.title}</div>
                <div className='block__course__characteristics'>
                    <div className='block__course__characteristics__level'>{props.level}</div>
                    <div className='block__course__characteristics__progLanguage'>{props.progLanguage}</div>
                </div>
            </div>
        )
    }

    return (
        <>
        </>
    )
}