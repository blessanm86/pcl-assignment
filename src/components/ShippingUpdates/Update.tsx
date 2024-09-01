import { formatDateTime } from '../../utils/date.ts';
import { Heading } from '../Heading.tsx';

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
      <p className="text-gray-500">{status_details}</p>
      <div className={'flex justify-between'}>
        <p className={'whitespace-nowrap text-right text-sm text-gray-900'}>
          {city}
        </p>
        <p className={'whitespace-nowrap text-right text-sm text-gray-900'}>
          {formatDateTime(event_timestamp)}
        </p>
      </div>
    </li>
  );
}
