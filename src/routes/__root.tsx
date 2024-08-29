import React, { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

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
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/*<div className="p-2 flex gap-2">*/}
        {/*  <Link to="/" className="[&.active]:font-bold">*/}
        {/*    Home*/}
        {/*  </Link>{' '}*/}
        {/*  <Link to="/order-details" className="[&.active]:font-bold">*/}
        {/*    About*/}
        {/*  </Link>*/}
        {/*</div>*/}
        {/*<hr />*/}
        {/*<h1 className="text-3xl font-bold underline ">Hello world!</h1>*/}
        <div className="mx-auto max-w-[1280px]">
          <Outlet />
        </div>

        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </div>
    );
  },
});
