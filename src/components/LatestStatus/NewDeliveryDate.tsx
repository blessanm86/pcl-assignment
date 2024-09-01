import { getHumanReadableDate } from '@pcl/utils/date.ts';

type Props = DeliveryMeta;

export function NewDeliveryDate({
  delivery_time_frame_from,
  delivery_time_frame_to,
  delivery_date,
}: Props) {
  return (
    <div>
      <p className="mb-2 font-medium">
        {getHumanReadableDate(delivery_date)}, {delivery_time_frame_from} -{' '}
        {delivery_time_frame_to}
      </p>
    </div>
  );
}
