import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, imageUrl, articleUrl }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <img src={imageUrl} alt="Article" className="w-full h-40 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
