import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => <Navigate to={'/order/tracking'} replace={true} />,
});
