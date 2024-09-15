import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  orderNumber: z
    .string()
    .trim()
    .min(1, { message: 'Please provide a valid order number' }),
  zipCode: z
    .string()
    .trim()
    .min(1, { message: 'Please provide a valid zip code' }),
});

export function useOrderTrackingForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      orderNumber: '',
      zipCode: '',
    },
  });
}
