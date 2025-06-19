import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

interface FilterProps {
  onFilterChange: (name: string) => void;
  initialValue?: string;
  placeholder?: string;
}
const Filter: React.FC<FilterProps> = ({ 
  onFilterChange, 
  initialValue = '', 
  placeholder = 'Поиск по имени...' 
}) => {
  const [searchName, setSearchName] = useState(initialValue);
  const [debouncedName, setDebouncedName] = useState(initialValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedName(searchName);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchName]);

  useEffect(() => {
    onFilterChange(debouncedName);
  }, [debouncedName, onFilterChange]);

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {searchName && (
        <button 
          onClick={() => setSearchName('')} 
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Filter;