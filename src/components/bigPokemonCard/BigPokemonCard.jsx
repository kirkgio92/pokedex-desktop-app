import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";

const BigPokemonCard = ({ pokemonID }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null);

  const getTypeIconUrl = (type) => `/pokemonTypes/${type.toLowerCase()}.png`;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => setPokemonData(data));
  }, [pokemonID]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => setPokemonSpeciesData(data));
  }, [pokemonID]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  if (!pokemonSpeciesData) {
    return <div>Loading...</div>;
  }

  const primaryType = pokemonData.types[0].type.name;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.BigPokemonCard} ${styles[`type-${primaryType}`]}`}
      >
        <h1>{pokemonData.name}</h1>
        <h2>{pokemonSpeciesData.names[9].name}</h2>
        <Image
          src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
          width={300}
          height={300}
          alt={pokemonData.name}
        />
        <p>{pokemonSpeciesData.flavor_text_entries[0].flavor_text}</p>
        {pokemonData.types.map((typeInfo) => {
          const type = typeInfo.type.name;
          const iconUrl = getTypeIconUrl(type);
          return (
            <div key={type}>
              <Image src={iconUrl} width={30} height={30} alt={type} />
              <p>{type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BigPokemonCard;
