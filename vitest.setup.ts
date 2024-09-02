import { createMemoryHistory, createRouter } from '@tanstack/react-router';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './src/mocks/node.ts';
import { routeTree } from './src/routeTree.gen';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

export function createRouterWithMemoryHistory(initialEntries = ['/']) {
  const memoryHistory = createMemoryHistory({
    initialEntries,
  });
  return createRouter({ routeTree, history: memoryHistory });
}
