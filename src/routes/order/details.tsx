import { getOrder } from '@pcl/api/getOrder.ts';
import { ArticleList } from '@pcl/components/ArticleList/ArticleList.tsx';
import { Box } from '@pcl/components/Box.tsx';
import { LoadingIcon } from '@pcl/components/Icons/LoadingIcon.tsx';
import { LatestStatus } from '@pcl/components/LatestStatus/LatestStatus.tsx';
import { PageWrapper } from '@pcl/components/PageWrapper.tsx';
import { ShippingUpdates } from '@pcl/components/ShippingUpdates/ShippingUpdates.tsx';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

const searchSchema = z.object({
  orderNumber: z.string().trim().default(''),
  zipCode: z.string().trim().default(''),
});

export const Route = createFileRoute('/order/details')({
  loaderDeps: ({ search: { orderNumber, zipCode } }) => ({
    orderNumber,
    zipCode,
  }),
  loader: ({ deps: { orderNumber, zipCode } }) =>
    getOrder({ orderNumber, zipCode }),
  validateSearch: zodSearchValidator(searchSchema),
  component: Details,
  pendingComponent: () => (
    <PageWrapper>
      <div className={'flex justify-center'}>
        <LoadingIcon />
      </div>
    </PageWrapper>
  ),
  errorComponent: () => <Navigate to={'/order/tracking'} replace={true} />,
});

function Details() {
  const order = Route.useLoaderData();
  if (!order)
    return (
      <PageWrapper>
        <div className={'flex flex-col items-center bg-white p-8'}>
          <p className={'text-red-700'}>
            Sorry, your order could not be found!
          </p>
          <Link to={'/order/tracking'} className={'underline'}>
            Click here to try again
          </Link>
        </div>
      </PageWrapper>
    );

  const [latestUpdate] = order.checkpoints;

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 place-items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Box>
          <LatestStatus
            status={latestUpdate.status}
            details={latestUpdate.status_details}
            meta={latestUpdate.meta}
          />
        </Box>
        <Box>
          <ShippingUpdates updates={order.checkpoints} />
        </Box>
        <Box>
          <ArticleList articles={order.delivery_info.articles} />
        </Box>
      </div>

      <Box className={'flex justify-center bg-transparent shadow-none'}>
        <Link to={'/order/tracking'} className={'underline'}>
          Click here to search for another order
        </Link>
      </Box>
    </PageWrapper>
  );
}
