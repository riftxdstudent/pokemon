import React, { useContext } from "react";
import { OwnedPokemonContext } from "../context/OwnedPokemonContext";
import MainLayout from "../MainLayout/MainLayout";

const OwnedPokemon = () => {
  const { ownedPokemon } = useContext(OwnedPokemonContext);

  return (
    <MainLayout>
      <div>
        <h1>Owned Pokemon</h1>
        {ownedPokemon.length > 0 ? (
          <ul>
            {ownedPokemon.map((pokemon) => (
              <li key={pokemon.id}>{pokemon.name}</li>
            ))}
          </ul>
        ) : (
          <p>No owned Pokemon available</p>
        )}
      </div>
    </MainLayout>
  );
};

export default OwnedPokemon;
