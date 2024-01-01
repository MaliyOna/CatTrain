import React, { useEffect } from 'react';
import './CheckboxCheck.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export function CheckboxCheck(props) {
    const [checked, setChecked] = React.useState(props.admin);

    useEffect(() => {
        setChecked(props.admin);
    }, [props.admin]);

    function handleChange(event) {
        setChecked(checked ? false : true);
        props.onChange(checked ? false : true);
    };

    return (
        <div className='checkboxCheck'>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                    />
                }
                label="Права админа"
            />

        </div>
    )
}