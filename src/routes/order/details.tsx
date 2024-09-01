import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { format } from 'date-fns';
import { z } from 'zod';
import { getOrder } from '../../api/getOrder.ts';
import parcelLabLogo from '../../assets/parcellab_logo.jpeg';
import { Box } from '../../components/Box.tsx';
import { Button } from '../../components/Button.tsx';
import { Heading } from '../../components/Heading.tsx';

const searchSchema = z.object({
  orderNumber: z.string().default(''),
  zipCode: z.string().default(''),
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
  errorComponent: () => <Navigate to={'/order/tracking'} replace={true} />,
});

function formatDateTime(timestamp: string): string {
  return format(new Date(timestamp), 'dd.MM.yyyy, H:mm');
}

const statusIconMap = {
  Registered: ClipboardDocumentCheckIcon,
  'In transit': TruckIcon,
  'Failed delivery attempt': ExclamationTriangleIcon,
  'New delivery date set': CalendarDaysIcon,
  'Ready for collection': CheckCircleIcon,
};

function Checkpoint({ item, totalItems, index }: any) {
  const StatusIcon = statusIconMap[item.status];

  return (
    <li>
      <div className="relative pb-8">
        {index < totalItems - 1 ? (
          <span
            className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        ) : null}
        <div className="relative flex space-x-3">
          <div>
            <span className="flex h-10 w-10 items-center justify-center bg-white ring-8 ring-white">
              <StatusIcon
                className="h-8 w-8 text-gray-600"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 text-sm">
            <div>
              <p className="font-medium leading-6 text-gray-900">
                {item.status}
              </p>
              <p className="text-gray-500">{item.status_details}</p>
            </div>
            <div className="whitespace-nowrap text-right text-sm text-gray-900">
              {formatDateTime(item.event_timestamp)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function Checkpoints({ items }: any) {
  return (
    <div>
      <Heading>Shipping Updates</Heading>
      <ul className="divide-y divide-gray-100">
        {items.map((item, index) => {
          return (
            <Checkpoint
              key={item.event_timestamp}
              item={item}
              totalItems={items.length}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default function PickupLocation({ address, status }: any) {
  return (
    <div>
      <Heading>{status.name}</Heading>
      <p className="mb-4">{status.details}</p>
      <p className="mb-2 font-medium">
        Location:{' '}
        <a
          className="underline"
          href={address.pickup_address_link}
          target="_blank"
          rel="noreferrer"
        >
          {address.pickup_address}
        </a>
      </p>
      <a href={address.pickup_address_link} target="_blank" rel="noreferrer">
        <img
          src={address.pickup_address_map_url}
          className="w-full rounded border border-gray-200"
          alt="Pickup Location Map"
        />
      </a>
    </div>
  );
}

export type Locale = 'de-DE' | 'en-US';

function formatCurrency(value: number, locale: Locale = 'de-DE') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

function ArticleImage({ url }: { url: string | null }) {
  return url ? (
    <img
      className="h-auto w-20 flex-none rounded bg-gray-50"
      src={url}
      alt="Product"
    />
  ) : (
    <div className="flex h-20 w-20 items-center justify-center text-gray-500">
      {/*<GiftIcon className="h-16 w-16" />*/}
    </div>
  );
}

function Article({ item }: any) {
  return (
    <li key={item.articleNo} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="flex w-20 justify-center">
          <ArticleImage url={item.articleImageUrl} />
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {item.quantity}x {item.articleName}
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            Article No: {item.articleNo}
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-900">
            {formatCurrency(item.price)}
          </p>
        </div>
      </div>
    </li>
  );
}

function ArticleList({ items }: any) {
  return (
    <>
      <Heading>Articles</Heading>

      <ul className="divide-y divide-gray-100">
        {items.map((item) => {
          return <Article key={item.articleNo} item={item} />;
        })}
      </ul>
    </>
  );
}

function Details() {
  const order = Route.useLoaderData();

  if (!order) return null;

  const latestCheckpoint = order.checkpoints[0];
  const isReadyForCollection =
    latestCheckpoint.status === 'Ready for collection';

  const signOut = () => {
    // flushOrder();
    // navigate('/', { replace: true });
  };

  console.log(latestCheckpoint.meta);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-50">
      <div className="mx-auto max-w-[1280px] p-0 sm:p-4">
        <header className="flex items-center justify-between px-2 py-4 sm:px-0">
          <Link to="/">
            <img
              className="h-18 w-auto rounded bg-blue-950 px-4 py-2"
              src={parcelLabLogo}
              alt="parcelLab"
            />
          </Link>

          <div>
            <Button
              type="button"
              className="flex items-center justify-center gap-2"
              onClick={signOut}
            >
              {/*<LogoutIcon className="h-4 w-4" /> Logout*/}
              Logout
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 place-items-stretch gap-4 lg:grid-cols-2">
          {isReadyForCollection ? (
            <Box>
              <PickupLocation
                address={latestCheckpoint.meta}
                status={{
                  name: latestCheckpoint.status,
                  details: latestCheckpoint.status_details,
                }}
              />
            </Box>
          ) : null}
          <Box>
            <Checkpoints items={order.checkpoints} />
          </Box>
          <Box>
            <ArticleList items={order.delivery_info.articles} />
          </Box>
        </div>
      </div>
    </div>
  );
}
