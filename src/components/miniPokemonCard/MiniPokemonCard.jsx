import styles from "./index.module.scss";
import Image from "next/image";

const MiniPokemonCard = ({ pokemon, onSelect }) => {
  const getTypeIconUrl = (type) => `/pokemonTypes/${type.toLowerCase()}.png`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatPokemonId = (id) => {
    return id.toString().padStart(4, "0");
  };

  const pokemonImage =
    pokemon.sprites.other?.dream_world?.front_default ||
    pokemon.sprites.front_default ||
    pokemon.sprites.other?.showdown?.front_default ||
    "/pokeball.png";

  const handleOnClick = () => {
    onSelect(pokemon.id);
  };

  return (
    <>
      <div className={styles.MiniPokemonCard} onClick={handleOnClick}>
        <Image
          className={styles.pokemonImage}
          src={pokemonImage}
          width={100}
          height={100}
          alt={pokemon.name}
          unoptimized={pokemonImage.endsWith(".gif")}
        />
        <div className={styles.infoWrapper}>
          <p>N. {formatPokemonId(pokemon.id)}</p>
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
