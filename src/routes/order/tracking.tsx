import { createFileRoute } from '@tanstack/react-router';
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
    formState: { errors, isValid },
  } = useOrderTrackingForm();

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center sm:px-6 lg:px-8">
      <Box className="sm:max-w-[480px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 -mt-20">
          <img
            className="mx-auto h-24 w-auto rounded"
            src={parcelLabLogo}
            alt="parcelLab Logo"
          />
        </div>
        <Heading>Track your order</Heading>
        <p className="text-gray-500 mb-6">
          Enter your order number and zip code combination to see the order
          details and shipping updates.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(() => {})}>
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
