import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OwnedPokemonContext = createContext();

const OwnedPokemonProvider = ({ children }) => {
  const [ownedPokemon, setOwnedPokemon] = useLocalStorage("ownedPokemon", []);

  const addOwnedPokemon = (pokemon) => {
    setOwnedPokemon((prevOwnedPokemon) => [...prevOwnedPokemon, pokemon]);
  };

  // const releaseOwnedPokemon = (pokemonId) => {
  //   setOwnedPokemon((prevOwnedPokemon) =>
  //     prevOwnedPokemon.map((pokemon) => {
  //       if (pokemon.id === pokemonId) {
  //         return { ...pokemon, isCaught: false };
  //       }
  //       return pokemon;
  //     })
  //   );
  // };
  
  const releaseOwnedPokemon = (pokemonId) => {
    setOwnedPokemon((prevOwnedPokemon) =>
      prevOwnedPokemon.filter((pokemon) => pokemon.id !== pokemonId)
    );
  };
  

  return (
    <OwnedPokemonContext.Provider
      value={{
        ownedPokemon,
        addOwnedPokemon,
        releaseOwnedPokemon,
      }}
    >
      {children}
    </OwnedPokemonContext.Provider>
  );
};

export { OwnedPokemonContext, OwnedPokemonProvider };