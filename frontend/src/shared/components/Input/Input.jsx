import React, { useEffect } from 'react';
import './Input.scss';

export function Input(props) {
  const { onChange, ...registerProps } = props.register?.(props.name, props.rules) || {};

  function handleChange(event) {
    if (onChange) {
      onChange(event);
    }
    props.onChange(event);
  }

  return (
    <div className='input'>
      <label className='input_label'>
        {props.label}

        < input
          className={`input_input ${props.error ? "input_input_error" : ""} ${props.border ? "input__border" : ""}`}
          type={props.type}
          value={props.value}
          onChange={handleChange}
          autoComplete={props.autoComplete}
          {...registerProps}
        />
        
        <span className='input__error'>
          {props.error?.message}
        </span>

      </label>
    </div>
  );
}