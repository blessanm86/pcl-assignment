import { formatCurrency } from '@pcl/utils/number.ts';
import { expect, test } from 'vitest';

test('when locale is not provided currency should be formatted with EUR currency and German locale as default', () => {
  expect(formatCurrency(4199)).toEqual('4.199,00 €');
});

test('when locale provided, currency should be formatted as per locale', () => {
  expect(formatCurrency(4199, 'en-US')).toEqual('€4,199.00');
});
