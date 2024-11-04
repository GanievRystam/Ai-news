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
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const articles = await getFavoriteArticles(user.uid);
        setFavorites(articles);
      }
    };
    console.log('dsajklf')
    fetchFavorites();
  }, [user]);

  return (
    <div>
      <h1>Your Favorite Articles</h1>
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
    </div>
  );
};

export default FavoritesPage;
