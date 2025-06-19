import React from 'react';
import type { Character } from '../../types/character';
import styles from './Card.module.css';

interface CharacterCardProps {
  character: Character;
}

const Card: React.FC<CharacterCardProps> = ({ character }) => {
  const getProxyUrl = (url: string) => {
    try {
      const cleanUrl = url.replace(/(^\w+:|^)\/\//, '');
      return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}`;
    } catch {
      
      return 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
    }
  };


  const imageUrl = getProxyUrl(character.image);

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={character.name}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
        }}
      />
      <div className={styles.info}>
        <h3>{character.name}</h3>
        <div 
          className={styles.badge} 
          data-status={character.status.toLowerCase()}
        >
          {character.status} - {character.species}
        </div>
        <p className={styles.location}>
          <strong>Location:</strong> {character.location.name}
        </p>
      </div>
    </div>
  );
};

export default Card;