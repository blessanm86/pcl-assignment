import { getOrder } from './handlers/getOrder.ts';
import { mswPassthrough } from './handlers/mswPassthrough.ts';

export const handlers = [getOrder, mswPassthrough];
