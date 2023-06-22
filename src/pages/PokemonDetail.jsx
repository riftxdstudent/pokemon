import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Pokemon Detail:", error);
        setError("Failed to fetch Pokemon details");
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-4"><span className="loading loading-dots loading-md"></span></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonDetails) {
    return <div>No Pokémon details available</div>;
  }

  const { sprites, name, types, weight, height, abilities, moves, stats } =
    pokemonDetails;

  return (
    <MainLayout>
      <div>
        <h1 className="flex justify-center my-4 font-bold text-2xl">
          Pokémon Detail
        </h1>

        <h2 className="flex justify-center font-medium text-xl capitalize">
          {name}
        </h2>

        <div className="flex flex-row items-center justify-center py-4">
          <img
            src={sprites.front_default}
            alt="Front Photos"
            className="w-48 aspect-square"
          />
          <img
            src={sprites.back_default}
            alt="Back Photos"
            className="w-48 aspect-square"
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-16 py-2">
          <ul>
            {types.map((type) => (
              <li
                key={type.type.name}
                className="font-medium text-lg capitalize"
              >
                {type.type.name}
              </li>
            ))}
          </ul>
          <h3 className="font-medium text-lg capitalize">
            {weight / 10} Kilograms
          </h3>
          <h3 className="font-medium text-lg capitalize">
            {height * 10} Centimetres
          </h3>
        </div>

        <h2 className="flex justify-center font-bold text-xl capitalize py-8">
          Abilities
        </h2>

        <div className="flex flex-row items-center justify-center gap-4">
          {abilities.map((ability) => (
            <h3
              key={ability.ability.name}
              className="font-medium text-lg capitalize"
            >
              {ability.ability.name}
            </h3>
          ))}
        </div>

        <h2 className="flex justify-center font-bold text-xl capitalize py-8">
          Stats
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 text-center px-8">
          {stats.map((stat) => (
            <div key={stat.stat.name}>
              <h2 className="font-bold text-xl capitalize py-2">
                {stat.stat.name}
              </h2>
              <h3 className="font-medium text-lg capitalize py-2">
                {stat.base_stat}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-8 px-12">
          <div className="collapse bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-xl text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
              Moves
            </div>
            <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
              <div className="flex flex-wrap justify-center gap-2">
                {moves.map((move) => (
                  <p className="text-lg capitalize" key={move.move.name}>
                    {move.move.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-8 pb-16">
        <button className="btn btn-outline btn-warning">Catch {name}</button>
      </div>

    </MainLayout>
  );
};

export default PokemonDetail;
