import { Heading } from '../Heading.tsx';
import { NewDeliveryDate } from './NewDeliveryDate.tsx';
import { Pickup } from './Pickup.tsx';

type Props = {
  status: Checkpoint['status'];
  details: Checkpoint['status_details'];
  meta?: Checkpoint['meta'];
};

function renderMeta(status: Checkpoint['status'], meta?: Checkpoint['meta']) {
  if (status === 'New delivery date set') {
    return <NewDeliveryDate {...(meta as DeliveryMeta)} />;
  }

  if (status === 'Ready for collection') {
    return <Pickup {...(meta as PickupMeta)} />;
  }

  return null;
}

export function LatestStatus({ status, details, meta }: Props) {
  return (
    <div className={'grid gap-4'}>
      <Heading as={'h2'}>{status}</Heading>
      <p>{details}</p>
      {renderMeta(status, meta)}
    </div>
  );
}
