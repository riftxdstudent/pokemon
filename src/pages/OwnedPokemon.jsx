import React, { useContext } from "react";
import { OwnedPokemonContext } from "../context/OwnedPokemonContext";
import MainLayout from "../MainLayout/MainLayout";

const OwnedPokemon = () => {
  const { ownedPokemon, releaseOwnedPokemon } = useContext(OwnedPokemonContext);

  const handleRelease = (pokemonId) => {
    releaseOwnedPokemon(pokemonId);
  }

  return (
    <MainLayout>
      <div>
        <h1 className="flex justify-center my-8 text-2xl font-bold">
          Owned Pokemon
        </h1>
        {ownedPokemon.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center px-16 py-8 gap-8">
            {ownedPokemon.map((pokemon) => (
              <div key={pokemon.id} className="card w-48 bg-neutral shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={pokemon.sprites.front_default}
                    alt="Pokemon"
                    className="w-32 aspect-square"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title capitalize">{pokemon.name}</h2>
                  <div className="card-actions">
                    <button className="btn btn-warning" onClick={() => handleRelease(pokemon.id)}>Release</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex justify-center">No owned Pokemon available</p>
        )}
      </div>
    </MainLayout>
  );
};

export default OwnedPokemon;
