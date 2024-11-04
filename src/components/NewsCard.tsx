import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { saveFavoriteArticle } from '../services/firestore';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, imageUrl, articleUrl }) => {
  const authContext = useAuth();
  if (!authContext) {
    return <div>Loading...</div>; 
  }
  const { user} = authContext;

  const handleSaveFavorite = () => {
    if (user) {
      const article = { title, description, imageUrl, articleUrl };
      saveFavoriteArticle(user.uid, article);
    } else {
      alert('Please login to save articles');
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow-lg p-4 rounded-lg"
  >
      <img src={imageUrl} alt="Article" className="w-full h-40 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block">
        Read more
      </a>
      <button onClick={handleSaveFavorite} className="mt-2 bg-blue-500 text-white py-1 px-2 rounded">
        Save to Favorites
      </button>
      </motion.div>
  );
};

export default React.memo(NewsCard);
