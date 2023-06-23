import React, { createContext, useState, useEffect } from "react";

const OwnedPokemonContext = createContext();

const OwnedPokemonProvider = ({ children }) => {
  const [ownedPokemon, setOwnedPokemon] = useState([]);

  useEffect(() => {
    const storedOwnedPokemon = localStorage.getItem("ownedPokemon");
    try {
      if (storedOwnedPokemon) {
        setOwnedPokemon(JSON.parse(storedOwnedPokemon));
      }
    } catch (error) {
      console.error("Error Parsing owned Pokemon data:", error);
      setOwnedPokemon([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ownedPokemon", JSON.stringify(ownedPokemon));
  }, [ownedPokemon]);

  const addOwnedPokemon = (pokemon) => {
    setOwnedPokemon((prevOwnedPokemon) => [...prevOwnedPokemon, pokemon]);
  };

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
