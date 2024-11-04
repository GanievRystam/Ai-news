import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { fetchNews } from '../services/api';
import { motion } from 'framer-motion';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsArticles = await fetchNews(category);
        setArticles(newsArticles);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category]);

  return (
    <div>
      <h2>Top Headlines in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
       <motion.div
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.8 }}
       transition={{ duration: 0.5 }}
       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
     >
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              articleUrl={article.url}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default NewsFeed;
