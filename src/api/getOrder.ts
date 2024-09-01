export const getOrder = async function ({
  orderNumber,
  zipCode,
}: {
  orderNumber: string;
  zipCode: string;
}) {
  const response = await fetch(
    `https://api.prcl.dev/orders/${orderNumber}?zipCode=${zipCode}`,
  );

  if (response.ok) {
    return (await response.json()) as Order;
  }

  return null;
};
