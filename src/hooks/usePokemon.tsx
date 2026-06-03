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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonFull | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset(0);
    setPokemonList([]);
    setHasMore(true);
  }, [selectedTypes]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        if (selectedTypes) {
          const { data } = await API.get(`type/${selectedTypes}`);
          const results = await Promise.all(
            data.pokemon.map((p: { pokemon: { url: string } }) =>
              fetchPokemon(p.pokemon.url),
            ),
          );

          setPokemonList(results);
          setHasMore(false);
        } else {
          const { data } = await API.get(`pokemon?limit=24&offset=${offset}`);
          const results = await Promise.all(
            data.results.map((pokemon: { url: string }) =>
              fetchPokemon(pokemon.url),
            ),
          );

          if (results.length < 24) {
            setHasMore(false);
          }

          setPokemonList((prev) =>
            offset === 0 ? results : [...prev, ...results],
          );
        }
      } catch {
        setError("Failed to load Pokémon. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
  }, [offset, selectedTypes]);

  useEffect(() => {
    if (!bottomRef.current || loading || !hasMore || selectedTypes) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setOffset((prev) => prev + 24);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(bottomRef.current);
    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore, selectedTypes]);

  const selectPokemon = async (id: number) => {
    try {
      setDetailLoading(true);
      setDetailError(null);
      const { data } = await API.get<PokemonFull>(`pokemon/${id}`);
      setSelectedPokemon(data);
    } catch {
      setDetailError("Failed to load Pokémon details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const clearSelectedPokemon = () => setSelectedPokemon(null);

  return {
    pokemonList,
    loading,
    error,
    bottomRef,
    selectedPokemon,
    detailLoading,
    detailError,
    selectPokemon,
    clearSelectedPokemon,
    selectedTypes,
    setSelectedTypes,
  };
};

export default usePokemon;
