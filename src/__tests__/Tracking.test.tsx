import { RouterProvider } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { createRouterWithMemoryHistory } from '../../vitest.setup.ts';

test('Tracking page: check for page render and initial state', async () => {
  const router = createRouterWithMemoryHistory();

  render(<RouterProvider router={router} />);

  expect(await screen.findByText('Track your order')).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Track/i })).toBeDisabled();
});

test('Tracking page: fill form, submit and ensure url update', async () => {
  const router = createRouterWithMemoryHistory();
  render(<RouterProvider router={router} />);

  expect(await screen.findByText('Track your order')).toBeInTheDocument();

  const orderNumberInput = screen.getByLabelText(/order number/i);
  const zipCodeInput = screen.getByLabelText(/zip code/i);
  await userEvent.type(orderNumberInput, 'xxx');
  await userEvent.type(zipCodeInput, 'yyy');

  const trackButton = screen.getByRole('button', { name: /Track/i });
  expect(trackButton).toBeEnabled();

  await userEvent.click(trackButton);
  expect(router.history.location).toMatchObject({
    pathname: '/order/details',
    search: '?orderNumber=xxx&zipCode=yyy',
  });
});
