import React, { useState } from 'react';
import Filters from './components/Filters';
import NewsFeed from './components/NewsFeed';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const [category, setCategory] = useState<string>('technology');
  const authContext = useAuth();
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
        </>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
      <Filters setCategory={setCategory} />
      <NewsFeed category={category}/>
    </div>
  );
};

export default App;
