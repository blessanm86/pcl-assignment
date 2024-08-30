import { http, passthrough } from 'msw';

export const mswPassthrough = http.get(/\/node_modules|jpeg$/, () => {
  return passthrough();
});
