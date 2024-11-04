import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { fetchNews } from '../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

interface NewsFeedProps {
  category: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ category }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreNews = async () => {
    const newArticles = await fetchNews(category, page);
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setPage(page + 1);
    if (newArticles.length === 0) setHasMore(false);
  };

  useEffect(() => {
    loadMoreNews();
  }, [category]);

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={loadMoreNews}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      endMessage={<p>No more articles</p>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            articleUrl={article.url}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default NewsFeed;
