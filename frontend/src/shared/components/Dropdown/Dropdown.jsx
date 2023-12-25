import React from 'react';
import './Dropdown.scss';

export function Dropdown(props) {
  const {onChange, ...registerProps} = props.register?.(props.name, props.rules) || {};

  function handleChange(event) {
    if(onChange){
      onChange(event);
    }
    props.onSelected(event.target.value);
  }

  return (
    <div className='dropdown'>
      <div className='dropdown_label'>{props.label}</div>

      <select 
        value={props.value || ""} 
        className={`dropdown_select ${props.error ? "dropdown_select_error" : ""}`}  
        onChange={handleChange} 
        {...registerProps}>
          <option disabled value=""> </option>
          {props.options.map(option => {
            return (<option key={option.value} value={option.value}>{option.text}</option>)
          })}
      </select>
      
      <span className='dropdown__error'>
          {props.error?.message}
      </span>
    </div>
  );
}