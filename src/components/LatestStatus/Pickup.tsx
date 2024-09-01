type Props = PickupMeta;

export function Pickup({
  pickup_address,
  pickup_address_link,
  pickup_address_map_url,
}: Props) {
  return (
    <div>
      <p className="mb-2 font-medium">
        Location:{' '}
        <a
          className="underline"
          href={pickup_address_link}
          target="_blank"
          rel="noreferrer"
        >
          {pickup_address}
        </a>
      </p>
      <a href={pickup_address_link} target="_blank" rel="noreferrer">
        <img
          src={pickup_address_map_url}
          className="w-full rounded border border-gray-200"
          alt="Pickup Location Map"
        />
      </a>
    </div>
  );
}
