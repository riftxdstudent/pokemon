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

    console.log(fetchPokemonDetails());
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

  return (
    <div>
      <MainLayout>
        <h1>Pokémon Detail Page</h1>
        <h2>Pokémon ID: {id}</h2>
        <h2>Pokémon Name: {pokemonDetails.name}</h2>
        {/* Render the rest of the Pokémon details */}
      </MainLayout>
    </div>
  );
}

export default PokemonDetail;
