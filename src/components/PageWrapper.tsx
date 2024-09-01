import { ReactNode } from 'react';

type Props = { children: ReactNode };

export function PageWrapper({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-50">
      <div className="mx-auto grid gap-8 p-0 sm:p-4">{children}</div>
    </div>
  );
}
