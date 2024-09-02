export const getOrder = async function ({
  orderNumber,
  zipCode,
}: {
  orderNumber: string;
  zipCode: string;
}) {
  //handling nullish values here as tanstack router validateSearch is not throwing error to show error component
  //could be bug
  // https://github.com/TanStack/router/issues/2043
  // https://github.com/TanStack/router/issues/2198

  if (!orderNumber || !zipCode) {
    return null;
  }

  const response = await fetch(
    `https://api.prcl.dev/orders/${orderNumber}?zipCode=${zipCode}`,
  );

  if (response.ok) {
    return (await response.json()) as Order;
  }

  return null;
};
