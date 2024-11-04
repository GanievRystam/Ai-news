import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFavoriteArticles } from '../services/firestore';
import NewsCard from '../components/NewsCard';

const FavoritesPage: React.FC = () => {
  const authContext = useAuth();
  if (!authContext) {
    return <div>Loading...</div>; 
  }
  const { user } = authContext;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [favorites, setFavorites] = useState<any[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchFavorites = async () => {
        setLoading(true);
      setError(null);
      try {
      if (user) {
        const articles = await getFavoriteArticles(user.uid);
        setFavorites(articles);
        setFavorites(articles);
    }
    } catch (err) {
        setError('Failed to load favorite articles. Please try again later.');
    } finally {
        setLoading(false);
    }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div>
      <h1>Your Favorite Articles</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {favorites.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              articleUrl={article.articleUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
