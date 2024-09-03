import { RouterProvider } from '@tanstack/react-router';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { createRouterWithMemoryHistory } from '../../vitest.setup.ts';

test('Details page: check for error page when order cannot be found', async () => {
  const router = createRouterWithMemoryHistory([
    '/order/details?orderNumber="1"&zipCode="1"',
  ]);

  render(<RouterProvider router={router} />);

  expect(
    await screen.findByText('Sorry, your order could not be found!'),
  ).toBeInTheDocument();
});

test('Details page: check ability to go back to tracking page when order cannot be found', async () => {
  const router = createRouterWithMemoryHistory([
    '/order/details?orderNumber="1"&zipCode="1"',
  ]);

  render(<RouterProvider router={router} />);

  expect(
    await screen.findByText('Sorry, your order could not be found!'),
  ).toBeInTheDocument();

  const linkElement = screen.getByRole('link', {
    name: /Click here to try again/i,
  });
  await userEvent.click(linkElement);
  expect(router.history.location).toMatchObject({
    pathname: '/order/tracking',
    search: '',
  });
});

test('Details page: check order is rendered when correct details are provided', async () => {
  const router = createRouterWithMemoryHistory([
    '/order/details?orderNumber="0000RTAB1"&zipCode="60156"',
  ]);

  render(<RouterProvider router={router} />);

  expect(
    await screen.findByRole('heading', { name: /Registered/i, level: 2 }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /Shipping Updates/i, level: 2 }),
  ).toBeInTheDocument();

  expect(screen.getByTestId('shipping-updates-list').children).toHaveLength(1);
  expect(screen.getByTestId('article-list').children).toHaveLength(1);
});

test('Details page: check ability to go to tracking page', async () => {
  const router = createRouterWithMemoryHistory([
    '/order/details?orderNumber="0000RTAB1"&zipCode="60156"',
  ]);

  render(<RouterProvider router={router} />);

  expect(
    await screen.findByRole('heading', { name: /Registered/i, level: 2 }),
  ).toBeInTheDocument();

  const linkElement = screen.getByRole('link', {
    name: /Click here to search for another order/i,
  });
  await userEvent.click(linkElement);
  expect(router.history.location).toMatchObject({
    pathname: '/order/tracking',
    search: '',
  });
});

test('Details page:ensure page works with back button click', async () => {
  const router = createRouterWithMemoryHistory([
    '/order/details?orderNumber="0000RTAB1"&zipCode="60156"',
  ]);

  render(<RouterProvider router={router} />);

  expect(
    await screen.findByRole('heading', { name: /Registered/i, level: 2 }),
  ).toBeInTheDocument();

  const linkElement = screen.getByRole('link', {
    name: /Click here to search for another order/i,
  });
  await userEvent.click(linkElement);
  expect(router.history.location).toMatchObject({
    pathname: '/order/tracking',
    search: '',
  });

  router.history.back();
  expect(
    await screen.findByRole('heading', { name: /Registered/i, level: 2 }),
  ).toBeInTheDocument();
});
