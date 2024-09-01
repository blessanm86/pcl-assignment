import { clsx } from 'clsx';
import React from 'react';

export const Box: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div
      className={clsx(
        className,
        'h-full bg-white p-8 shadow sm:mx-auto sm:w-full sm:rounded',
      )}
    >
      {children}
    </div>
  );
};
