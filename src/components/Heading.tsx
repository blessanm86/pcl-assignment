import { clsx } from 'clsx';
import React, { JSX, ReactNode } from 'react';

type Props = {
  as?:
    | React.ElementType<JSX.IntrinsicElements['h1'], 'h1'>
    | React.ElementType<JSX.IntrinsicElements['h2'], 'h2'>
    | React.ElementType<JSX.IntrinsicElements['h3'], 'h3'>
    | React.ElementType<JSX.IntrinsicElements['h4'], 'h4'>;
  children: ReactNode;
};

const styles = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
};

export function Heading({ as = 'h1', children }: Props) {
  const Component = as;
  const classes = clsx('font-medium', styles[as as keyof typeof styles]);

  return <Component className={classes}>{children}</Component>;
}
