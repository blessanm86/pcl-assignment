import {
  createFileRoute,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import parcelLabLogo from '../../assets/parcellab_logo.jpeg';
import { Box } from '../../components/Box.tsx';
import { Button } from '../../components/Button.tsx';
import { Heading } from '../../components/Heading.tsx';
import { Input } from '../../components/Input.tsx';
import { useOrderTrackingForm } from '../../hooks/useOrderTrackingForm.ts';

export const Route = createFileRoute('/order/tracking')({
  component: Tracking,
});

function Tracking() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useOrderTrackingForm();
  const navigate = useNavigate({ from: '/order/tracking' });
  const state = useRouterState({ select: (s) => s.location.state });
  console.log(state);

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center sm:px-6 lg:px-8">
      <Box className="sm:max-w-[480px]">
        <div className="-mt-20 mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-24 w-auto rounded"
            src={parcelLabLogo}
            alt="parcelLab Logo"
          />
        </div>
        <Heading>Track your order</Heading>
        <p className="mb-6 text-gray-500">
          Enter your order number and zip code combination to see the order
          details and shipping updates.
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(() =>
            navigate({
              to: '/order/details',
              search: {
                orderNumber: getValues('orderNumber'),
                zipCode: getValues('zipCode'),
              },
            }),
          )}
        >
          <Input
            {...register('orderNumber')}
            error={errors.orderNumber?.message}
            type="text"
            label="Order Number"
            autoComplete="off"
          />
          <Input
            {...register('zipCode')}
            error={errors.zipCode?.message}
            type="text"
            label="Zip Code"
            autoComplete="off"
          />

          <Button type="submit" disabled={!isValid}>
            Track
          </Button>
        </form>
      </Box>
    </div>
  );
}
