import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error Fetching Pokemon Detail:', error);
        setError('Failed to fetch Pokemon details');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonDetails) {
    return <div>No Pokémon details available</div>;
  }

  const { sprites, name, types, weight, height, abilities, moves, stats } = pokemonDetails;

  return (
    <div>
      <MainLayout>
        <h1 className="flex justify-center my-4 font-bold text-2xl">Pokémon Detail</h1>

        <h2>Name: {name}</h2>
        <h2>Types: </h2>
        <ul>
          {types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
        <h2>Weight: {weight / 10} Kilograms</h2>
        <h2>Pokémon Height: {height * 10} Centimetres</h2>
        <h2>Abilities: </h2>
        <ul>
          {abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <h2>Moves</h2>
        <ul>
          {moves.map((move) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
        <h2>Stats</h2>
        <ul>
          {stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </MainLayout>
    </div>
  );
};

export default PokemonDetail;
