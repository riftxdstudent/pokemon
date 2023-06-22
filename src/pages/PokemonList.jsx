import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

import Pagination from "../components/Pagination";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=248")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pokemonWithDetailsPromises = pokemonList.map((pokemon) =>
          fetch(pokemon.url).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json();
          })
        );
        const pokemonWithDetails = await Promise.all(pokemonWithDetailsPromises);
        setPokemonList(pokemonWithDetails);
        const totalPages = Math.ceil(pokemonWithDetails.length / 16);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchPokemonDetails();
  }, [pokemonList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 16;
  const endIndex = startIndex + 16;
  const displayedPokemon = pokemonList.slice(startIndex, endIndex);

  return (
    <MainLayout>
      <div>
        <h1 className="flex justify-center my-4 font-bold text-2xl">Pokemon List</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="m-8">
            <div className="grid grid-cols-2 gap-4 mx-4 md:grid-cols-4">
              {displayedPokemon.map((pokemon) => (
                <div key={pokemon.id} className="border p-4">
                  <Link to={`/pokemon/${pokemon.id}`} className="flex justify-center text-lg font-bold">
                    {pokemon.name}
                  </Link>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PokemonList;
