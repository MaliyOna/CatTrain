import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './RadioGroup.scss';

export default function RadioButtonsGroup(props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{props.text}</FormLabel>
      <RadioGroup
        aria-labelledby="skill-level "
        value={props.value}
        onChange={props.handleChange}
      >
        { props.elements.map ((element, index) => 
          <FormControlLabel key={index} value={element} control={<Radio />} label={element} />
        )
        }
      </RadioGroup>
    </FormControl>
  );
}