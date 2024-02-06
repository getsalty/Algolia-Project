import React, { MouseEventHandler, ReactNode, RefObject } from 'react';
import Ripple from 'material-ripple-effects';

type Props = {
  ripple?: boolean;
  className?: string;
  children?: ReactNode;
  ref?: RefObject<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'filled' | 'outlined' | 'gradient' | 'text';
  endIcon?: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = (props: Props) => {
  const {
    ripple = true,
    className,
    children,
    ref,
    onClick,
    variant = 'filled',
    endIcon,
    ...rest
  } = props;

  const rippleEffect = new Ripple();

  return (
    <button
      {...rest}
      ref={ref}
      className={`rounded bg-blue-600 py-2 px-4 text-sm uppercase tracking-wide text-white shadow-md shadow-black/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-black/30 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${className}`}
      type="button"
      onClick={(e) => {
        if (ripple) {
          rippleEffect.create(
            e,
            variant === 'filled' || variant === 'gradient' ? 'light' : 'dark',
          );
        }

        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
