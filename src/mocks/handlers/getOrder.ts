import { http, HttpResponse } from 'msw';
import orders from '../data/orders.json';

const mockOrders = orders as Order[];

type Params = {
  orderNumber: string;
  zipCode: string;
};

export const getOrder = http.get<Params, Order>(
  `https://api.prcl.dev/orders/:orderNumber`,
  ({ params, request }) => {
    const url = new URL(request.url);
    const zipCode = url.searchParams.get('zipCode');

    const { orderNumber } = params;

    const foundOrder = mockOrders.find(
      (o) => o.delivery_info.orderNo === orderNumber && o.zip_code === zipCode,
    );

    if (!foundOrder) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(foundOrder);
  },
);
