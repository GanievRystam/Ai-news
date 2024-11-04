import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { fetchNews } from '../services/api';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const newsArticles = await fetchNews(category);
      setArticles(newsArticles);
      setLoading(false);
    };

    loadNews();
  }, [category]);

  return (
    <div>
      <h2>Top Headlines in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default NewsFeed;
