import { Heading } from '@pcl/components/Heading.tsx';
import { Update } from '@pcl/components/ShippingUpdates/Update.tsx';

type Props = {
  updates: Checkpoint[];
};

export function ShippingUpdates({ updates }: Props) {
  return (
    <div className={'grid gap-4'}>
      <Heading as={'h2'}>Shipping Updates</Heading>
      <ul className="grid gap-4">
        {updates.map((upd) => (
          <Update {...upd} key={upd.event_timestamp} />
        ))}
      </ul>
    </div>
  );
}
