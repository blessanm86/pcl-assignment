import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classnames } from '../utils/classnames.ts';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
};

export function Button({ className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={classnames(
        className,
        'flex w-full justify-center rounded bg-blue-950 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-300 disabled:opacity-50',
      )}
    >
      {children}
    </button>
  );
}
