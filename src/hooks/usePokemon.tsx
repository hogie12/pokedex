import API from "@/configs/api";
import type { Pokemon, PokemonFull } from "@/types";
import { useEffect, useRef, useState } from "react";

async function fetchPokemon(url: string): Promise<Pokemon> {
  const { data } = await API.get<PokemonFull>(url);
  return {
    id: data.id,
    name: data.name,
    imageUrl:
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
  };
}

const usePokemon = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setLoading(true);
          setOffset(offset + 24);
        }
      },
      { threshold: 1 },
    );
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`pokemon?limit=24&offset=${offset}`);
        const results = await Promise.all(
          data.results.map((pokemon: { url: string }) =>
            fetchPokemon(pokemon.url),
          ),
        );
        setPokemonList((prev) => [...prev, ...results]);
        if (results.length < 1) {
          observer.disconnect();
        }
      } catch {
        setError("Failed to load Pokémon. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [offset]);

  useEffect(() => {}, [offset]);

  return { pokemonList, loading, error, bottomRef };
};

export default usePokemon;
