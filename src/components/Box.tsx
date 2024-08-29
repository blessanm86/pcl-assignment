import React from 'react';
import { classnames } from '../utils/classnames.ts';

export const Box: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={classnames(className, 'sm:mx-auto sm:w-full')}>
      <div className="bg-white px-6 py-8 shadow sm:rounded sm:px-12 h-full">
        {children}
      </div>
    </div>
  );
};
