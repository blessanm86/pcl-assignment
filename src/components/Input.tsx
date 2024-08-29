import React, { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input: React.FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, error, ...rest }: InputProps, ref) => {
  return (
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
      <div className="mt-2">
        <input
          {...rest}
          ref={ref}
          className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {error ? (
          <div className="text-md text-red-400 font-medium mt-1">{error}</div>
        ) : null}
      </div>
    </label>
  );
});

Input.displayName = 'Input';
