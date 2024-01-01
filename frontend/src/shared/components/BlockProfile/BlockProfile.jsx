import Reac from 'react';
import './BlockProfile.scss';
import { ButtonWithDocument } from '../ButtonWithDocument/ButtonWithDocument';

export function BlockProfile(props) {
    return (
        <div className='blockProfile'>
            <div className='blockProfile__title'>{props.title}</div>
            <div className='blockProfile__completed'>
                <div className='blockProfile__completed__number'>
                    {props.completed}</div>
                </div>

                <div className='blockProfile__completed__button'>
                    {props.completedAll ?
                        <ButtonWithDocument engTitle={props.engTitle} title={props.title}/>
                        : <></>}
                </div>
        </div>
    )
}