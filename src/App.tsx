import React, { useState } from 'react';
import Filters from './components/Filters';
import NewsFeed from './components/NewsFeed';
import { useAuth } from './context/AuthContext';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import FavoritesPage from './pages/FavoritesPage';
import { AnimatePresence } from 'framer-motion';
const App: React.FC = () => {
  const [category, setCategory] = useState<string>('technology');
  const authContext = useAuth();
  const location = useLocation();
  if (!authContext) {
    return <div>Loading...</div>; 
  }
  const { user, login, logout } = authContext;
  return (
    <div className="App">
      <h1>AI News Feed</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
          <button onClick={() => window.location.href = '/favorites'}>Favorites</button>
        </>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<><Filters setCategory={(category) => console.log(category)} /><NewsFeed category="technology" /></>} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
