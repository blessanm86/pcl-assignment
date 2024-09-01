import { Article } from '@pcl/components/ArticleList/Article.tsx';
import { Heading } from '@pcl/components/Heading.tsx';

type Props = {
  articles: Article[];
};

export function ArticleList({ articles }: Props) {
  return (
    <div className={'grid gap-4'}>
      <Heading as={'h2'}>Articles</Heading>
      <ul className="grid gap-4">
        {articles.map((art) => {
          return <Article key={art.articleNo} {...art} />;
        })}
      </ul>
    </div>
  );
}
