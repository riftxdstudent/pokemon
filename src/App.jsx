import React from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import OwnedPokemon from './components/OwnedPokemon';

function App() {
  return (
    <div>
      <h1>Pokemon List</h1>
      <PokemonList />
      <PokemonDetail />
      <OwnedPokemon />
    </div>
  );
}

export default App;
