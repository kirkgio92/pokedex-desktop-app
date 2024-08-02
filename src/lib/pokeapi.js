import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const regionToPokedex = {
  kanto: 2,
  johto: 3,
  hoenn: 4,
  sinnoh: 5,
  unova: 8,
  kalos: 12,
  alola: 16,
  galar: 27,
  hisui: 30,
  paldea: 31,
};

export const fetchRegions = async () => {
  const response = await axios.get(`${BASE_URL}/region`);
  return response.data.results;
};

export const fetchRegionDetails = async (regionName) => {
  const response = await axios.get(`${BASE_URL}/region/${regionName}`);
  return response.data;
};

export const fetchTypes = async () => {
  const response = await axios.get(`${BASE_URL}/type`);
  return response.data.results;
};

export const fetchPokemonByType = async (typeName) => {
  const response = await axios.get(`${BASE_URL}/type/${typeName}`);
  return response.data.pokemon;
};

export const fetchPokemonDetails = async (pokemonName) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
  return response.data;
};

export const fetchPokedex = async (pokedexId) => {
  const response = await axios.get(`${BASE_URL}/pokedex/${pokedexId}`);
  return response.data;
};
