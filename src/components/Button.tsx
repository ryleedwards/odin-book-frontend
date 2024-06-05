import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode | React.ReactNode[];
}

const Button = ({ className, onClick, children, ...rest }: ButtonProps) => {
  const style: string = 'px-3 py-2 font-semibold';
  return (
    <button {...rest} className={`${className} ${style}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
