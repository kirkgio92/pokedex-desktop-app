import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchPokedex } from "@/lib/pokeapi";
import { regionToPokedex } from "@/lib/pokeapi";

export default function Region() {
  const router = useRouter();
  const { regionName } = router.query;
  const [pokedex, setPokedex] = useState(null);

  useEffect(() => {
    if (regionName) {
      const getPokedex = async () => {
        const pokedexId = regionToPokedex[regionName.toLowerCase()];
        if (pokedexId) {
          const data = await fetchPokedex(pokedexId);
          setPokedex(data);
        } else {
          console.error(`Unknown region: ${regionName}`);
        }
      };
      getPokedex();
    }
  }, [regionName]);

  if (!pokedex) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokedex.name} Region Pokémon</h1>
      <ul>
        {pokedex.pokemon_entries.map((entry) => (
          <li key={entry.pokemon_species.name}>{entry.pokemon_species.name}</li>
        ))}
      </ul>
    </div>
  );
}
