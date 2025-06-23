import type { Character } from "../types/character";

export const fetchCharacters = async (): Promise<Character[]> => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    if (!response.ok) throw new Error('Network error');
    
    const data = await response.json();
    console.log('Data:', data.results[0]?.image);
    return data.results.map((char: any) => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      location: { name: char.location.name },
      image: char.image
    }));
  };
