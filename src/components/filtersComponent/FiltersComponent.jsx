import styles from "./index.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  fetchTypes,
  fetchPokemonByType,
  fetchPokemonDetails,
} from "@/lib/pokeapi";
import MiniPokemonCard from "../miniPokemonCard";

const FiltersComponent = ({ setPokemonID }) => {
  const [searchName, setSearchName] = useState("");
  const [types, setTypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const handlePokemonSelect = (ID) => {
    setPokemonID(ID);
  };

  const getTypeIconUrl = (type) => `/pokemonTypes/${type.toLowerCase()}.png`;

  useEffect(() => {
    const loadTypes = async () => {
      const typesData = await fetchTypes();
      setTypes(typesData);
    };
    loadTypes();
  }, []);

  const handleTypeClick = async (typeName) => {
    try {
      const pokemonData = await fetchPokemonByType(typeName);
      const pokemons = await Promise.all(
        pokemonData.map(async (data) => {
          const details = await fetchPokemonDetails(data.pokemon.name);
          return details;
        })
      );
      setFilteredPokemons(pokemons);
    } catch (error) {
      console.error("Error fetching Pokémon by type:", error);
      setFilteredPokemons([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const searchPokemonByName = async () => {
    try {
      const pokemon = await fetchPokemonDetails(searchName.toLowerCase());
      setFilteredPokemons([pokemon]);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setFilteredPokemons([]);
    }
  };

  return (
    <>
      <div className={styles.FiltersComponent}>
        <div className={styles.searchBarWrapper}>
          <h2>Looking for a specific Pokemon?</h2>
          <input
            type="text"
            value={searchName}
            onChange={handleSearchChange}
            placeholder="Enter Pokémon name"
          />
          <button onClick={searchPokemonByName}>Search</button>
        </div>
        <div className={styles.typesWrapper}>
          <h2>Or look for a specific type!</h2>
          <div className={styles.TypesContainer}>
            {types
              .filter(
                (type) => type.name !== "stellar" && type.name !== "unknown"
              )
              .map((type) => (
                <button
                  key={type.name}
                  className={styles.typeBtn}
                  onClick={() => handleTypeClick(type.name)}
                >
                  <Image
                    key={type.name}
                    src={getTypeIconUrl(type.name)}
                    alt={type.name}
                    className={styles.TypeImage}
                    width={30}
                    height={30}
                  />
                  {type.name.toUpperCase()}
                </button>
              ))}
          </div>
        </div>
        <div className={styles.PokemonList}>
          {filteredPokemons && filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <MiniPokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelect={handlePokemonSelect}
              />
            ))
          ) : (
            <div className={styles.snorlaxWrapper}>
              <p>First you need to look for a Pokemon!</p>
              <p>Only after Snorlax will move!</p>
              <Image
                className={styles.snorlax}
                alt={"Snorlax"}
                width={120}
                height={120}
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/143.svg"
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FiltersComponent;
