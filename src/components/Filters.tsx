import React, { useCallback } from 'react';

interface FiltersProps {
  setCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ setCategory }) => {
  const handleSetCategory = useCallback((category: string) => {
    setCategory(category);
  }, [setCategory]);

  return (
    <div className="flex gap-4 p-4">
      <button onClick={() => handleSetCategory('technology')} className="btn-filter">Technology</button>
      <button onClick={() => handleSetCategory('sports')} className="btn-filter">Sports</button>
      <button onClick={() => handleSetCategory('business')} className="btn-filter">Business</button>
      <button onClick={() => handleSetCategory('health')} className="btn-filter">Health</button>
    </div>
  );
};

export default React.memo(Filters);
