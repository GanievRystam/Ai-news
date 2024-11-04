import React from 'react';

interface FiltersProps {
  setCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ setCategory }) => {
  return (
    <div className="flex gap-4 p-4">
      <button onClick={() => setCategory('technology')} className="btn-filter">Technology</button>
      <button onClick={() => setCategory('sports')} className="btn-filter">Sports</button>
      <button onClick={() => setCategory('business')} className="btn-filter">Business</button>
      <button onClick={() => setCategory('health')} className="btn-filter">Health</button>
    </div>
  );
};

export default Filters;
