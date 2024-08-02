import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchPokemonByType, fetchPokemonDetails } from "@/lib/pokeapi";

export default function Type() {
  const router = useRouter();
  const { typeName } = router.query;
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeName) {
      const getPokemonList = async () => {
        try {
          const data = await fetchPokemonByType(typeName);
          const detailedPokemonList = await Promise.all(
            data.map(async ({ pokemon }) => {
              const details = await fetchPokemonDetails(pokemon.name);
              return details;
            })
          );
          setPokemonList(detailedPokemonList);
        } catch (error) {
          console.error("Failed to fetch Pokémon details:", error);
        } finally {
          setLoading(false);
        }
      };
      getPokemonList();
    }
  }, [typeName]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{typeName} Type Pokémon</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <h2>
              {pokemon.name} (ID: {pokemon.id})
            </h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>
              Types: {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
