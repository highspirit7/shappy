import React from 'react';
import type { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-md hover:brightness-125"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
