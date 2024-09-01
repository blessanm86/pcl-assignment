import { Heading } from '../Heading.tsx';
import { Update } from './Update.tsx';

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
