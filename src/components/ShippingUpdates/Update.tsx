import { Heading } from '@pcl/components/Heading.tsx';
import { formatISODateTime } from '@pcl/utils/date.ts';

type Props = Checkpoint;

export function Update({
  status,
  status_details,
  event_timestamp,
  city,
}: Props) {
  return (
    <li className={'grid gap-1'}>
      <Heading as={'h4'}>{status}</Heading>
      <p className="text-base text-gray-500">{status_details}</p>
      <div className={'flex justify-between'}>
        <p className={'whitespace-nowrap text-right text-sm'}>{city}</p>
        <p className={'whitespace-nowrap text-right text-sm'}>
          {formatISODateTime(event_timestamp)}
        </p>
      </div>
    </li>
  );
}
