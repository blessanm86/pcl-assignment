import { Heading } from '@pcl/components/Heading.tsx';
import { formatCurrency } from '@pcl/utils/number.ts';

type Props = Article;

export function Article({
  articleNo,
  articleImageUrl,
  articleName,
  quantity,
  price,
}: Props) {
  return (
    <li key={articleNo}>
      <div className="flex min-w-0 gap-x-4">
        <div className="flex w-20 justify-center">
          <img
            className="h-auto w-20 flex-none rounded bg-gray-50"
            src={articleImageUrl || 'https://placehold.co/80x80'}
            alt="Product"
          />
        </div>
        <div className="min-w-0 flex-auto">
          <Heading as={'h4'}>
            {quantity}x {articleName}
          </Heading>
          <p className="text-base text-gray-500">{formatCurrency(price)}</p>
          <p className={'mt-1 whitespace-nowrap text-sm'}>
            Article No: {articleNo}
          </p>
        </div>
      </div>
    </li>
  );
}
