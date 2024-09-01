import { clsx } from 'clsx';
import React from 'react';

export const Box: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={clsx(className, 'sm:mx-auto sm:w-full')}>
      <div className="h-full bg-white px-6 py-8 shadow sm:rounded sm:px-12">
        {children}
      </div>
    </div>
  );
};
