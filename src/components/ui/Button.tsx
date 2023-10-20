import React from 'react';
import type { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: any;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (disabled === true) ? (
    <button
      className="bg-brand text-white py-2 px-4 rounded-md cursor-pointer hover:brightness-125"
      onClick={onClick}
      disabled
    >
      {text}
    </button>
  ) : (
    <button
      className="bg-brand text-white py-2 px-4 rounded-md cursor-pointer hover:brightness-125"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
