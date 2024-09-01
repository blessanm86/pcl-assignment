import { createRootRoute, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto">
          <Outlet />
        </div>

        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </div>
    );
  },
});
