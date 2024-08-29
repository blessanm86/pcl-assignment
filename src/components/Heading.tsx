import { FC, ReactNode } from 'react';

export const Heading: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="text-xl font-medium mb-2">{children}</div>
);
