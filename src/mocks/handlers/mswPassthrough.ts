import { http, passthrough } from 'msw';

export const mswPassthrough = http.get(
  /\/node_modules|chrome-extension|src|jpeg$/,
  () => {
    return passthrough();
  },
);
