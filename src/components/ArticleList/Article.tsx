import { formatCurrency } from '../../utils/number.ts';

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
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {quantity}x {articleName}
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            Article No: {articleNo}
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-900">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
    </li>
  );
}
