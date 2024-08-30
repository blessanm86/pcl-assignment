import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/details')({
  component: () => <div>Hello /order/details!</div>
})