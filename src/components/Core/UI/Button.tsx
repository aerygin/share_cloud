import React, { ReactNode, HTMLProps } from 'react';

type BtnType = 'button' | 'submit' | 'reset';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: BtnType;
  sx?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, type, sx, ...props }) => {
  return (
    <button
      {...props}
      type={type ?? 'button'}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        ...sx, // Apply custom styles
      }}
    >
      {children}
    </button>
  );
};

export default Button;
