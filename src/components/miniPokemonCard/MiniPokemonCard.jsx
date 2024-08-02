import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const MiniPokemonCard = ({ pokemon }) => {
  const getTypeIconUrl = (type) => `/pokemonTypes/${type.toLowerCase()}.png`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatPokemonId = (id) => {
    return id.toString().padStart(4, "0");
  };

  const pokemonImage =
    pokemon.sprites.other?.showdown?.front_default ||
    pokemon.sprites.front_default ||
    pokemon.sprites.other?.dream_world?.front_default ||
    "/pokeball.png";

  return (
    <>
      <div className={styles.MiniPokemonCard}>
        <Image
          className={styles.pokemonImage}
          src={pokemonImage}
          width={120}
          height={120}
          alt={pokemon.name}
          unoptimized={pokemonImage.endsWith(".gif")}
        />
        <div className={styles.infoWrapper}>
          <p>{formatPokemonId(pokemon.id)}</p>
          <h4>{capitalizeFirstLetter(pokemon.name)}</h4>
          <div className={styles.typesWrapper}>
            {pokemon.types.map((typeInfo) => {
              const type = typeInfo.type.name;
              const iconUrl = getTypeIconUrl(type);

              return (
                <Image
                  key={type}
                  src={iconUrl}
                  width={30}
                  height={30}
                  alt={type}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniPokemonCard;
