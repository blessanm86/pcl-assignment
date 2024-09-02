import { formatDate, formatISODateTime } from '@pcl/utils/date.ts';
import { expect, test } from 'vitest';

test('when ISO date provided, return human readable date and time', () => {
  expect(formatISODateTime('2023-01-07T20:02:30Z')).toEqual(
    '07.01.2023, 21:02',
  );
});

test('when date provided, return human readable date', () => {
  expect(formatDate('2023-01-25')).toEqual('Jan 25, 2023');
});
