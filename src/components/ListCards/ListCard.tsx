import React, { useEffect, useState, useCallback } from 'react';
import type { Character } from '../../types/character';
import styles from './ListCard.module.css';
import Card from '../Cards/Card';
import { fetchCharacters } from '../../api/rickAndMorty';
import Filter from '../Filter/Filter';

const List: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setAllCharacters(data);
        setFilteredCharacters(data);
      } catch (err) {
        setError('Failed to load characters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const handleNameFilter = useCallback((name: string) => {
    if (!name.trim()) {
      setFilteredCharacters(allCharacters);
      return;
    }
    
    const filtered = allCharacters.filter(character => 
      character.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [allCharacters]);

  if (loading) return <div className={styles.loadingWrapper}>Loading...</div>;
  if (error) return <div className={styles.errorWrapper}>{error}</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filterContainer}>
        <Filter onFilterChange={handleNameFilter} />
      </div>
      
      <div className={styles.contentContainer}>
        {filteredCharacters.length === 0 ? (
          <div className={styles.emptyWrapper}>
            Не найдено
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {filteredCharacters.map(character => (
              <Card key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(List);