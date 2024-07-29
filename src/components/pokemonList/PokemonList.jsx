import { useEffect, useState } from "react";
import MiniPokemonCard from "../miniPokemonCard";
import axios from "axios";
import styles from "./index.module.scss";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);

        const pokemonDetailsPromises = pokemonUrls.map((url) => axios.get(url));
        const pokemonDetailsResponses = await Promise.all(
          pokemonDetailsPromises
        );

        const allPokemons = pokemonDetailsResponses.map(
          (response) => response.data
        );
        setPokemonData(allPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  if (loading) {
    return (
      <div className={styles.PokemonList}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.PokemonList}>
        {pokemonData.map((pokemon) => (
          <MiniPokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
};

export default PokemonList;
