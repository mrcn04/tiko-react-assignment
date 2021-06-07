/* eslint-disable react/button-has-type */
import React from 'react';
import IButton from '../interfaces/button.interface';

export default function Button({
  type,
  name,
  style,
  onClick,
  className,
  disabled,
}: IButton) {
  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  style: {},
  className: '',
  disabled: false,
};
