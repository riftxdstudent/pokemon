import React from 'react';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import OwnedPokemon from './pages/OwnedPokemon';

import { OwnedPokemonProvider } from './context/OwnedPokemonContext';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <OwnedPokemonProvider>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/owned-pokemon" element={<OwnedPokemon />} />
      </Routes>
    </OwnedPokemonProvider>
  );
}

export default App;
