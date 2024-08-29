import {
  ButtonHTMLAttributes,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import { createFileRoute } from '@tanstack/react-router';
import parcelLabLogo from '../assets/parcellab_logo.jpeg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type TrackingFormValues = {
  orderNumber: string;
  zipCode: string;
};

function useTrackingForm() {
  const schema = useMemo(() => {
    return z.object({
      orderNumber: z
        .string()
        .min(1, { message: 'Please provide a valid Order Number' }),
      zipCode: z
        .string()
        .min(1, { message: 'Please provide a valid Zip Code' }),
    });
  }, []);

  return useForm<TrackingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderNumber: '', // TODO remove defaults
      zipCode: '',
    },
  });
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        <div className="mt-2">
          <input
            {...rest}
            ref={ref}
            className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {error ? (
            <div className="text-md text-red-400 font-medium mt-1">{error}</div>
          ) : null}
        </div>
      </label>
    );
  },
);

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

function Card({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={classNames(className, 'sm:mx-auto sm:w-full')}>
      <div className="bg-white px-6 py-8 shadow sm:rounded sm:px-12 h-full">
        {children}
      </div>
    </div>
  );
}

const Headline = ({ children }: { children: ReactNode }) => (
  <div className="text-xl font-medium mb-2">{children}</div>
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
};

function Button({ className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={classNames(
        className,
        'flex w-full justify-center rounded bg-blue-950 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors',
      )}
    >
      {children}
    </button>
  );
}

export const Route = createFileRoute('/')({
  component: () => {
    const { formState, handleSubmit, register } = useTrackingForm();

    return (
      <div className="flex h-screen flex-1 flex-col justify-center items-center sm:px-6 lg:px-8">
        <Card className="sm:max-w-[480px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 -mt-20">
            <img
              className="mx-auto h-24 w-auto rounded"
              src={parcelLabLogo}
              alt="parcelLab Logo"
            />
          </div>
          <Headline>Track your order</Headline>
          <p className="text-gray-500 mb-6">
            Enter your order number and zip code combination to see the order
            details and shipping updates.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(() => {})}>
            <Input
              {...register('orderNumber')}
              error={formState.errors.orderNumber?.message}
              type="text"
              label="Order Number"
              autoComplete="off"
            />
            <Input
              {...register('zipCode')}
              error={formState.errors.zipCode?.message}
              type="text"
              label="Zip Code"
              autoComplete="off"
            />

            <Button type="submit">Track</Button>
          </form>
        </Card>
      </div>
    );
  },
});
