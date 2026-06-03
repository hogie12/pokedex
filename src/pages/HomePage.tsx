import { Card, PokemonModal, TypeFilterChips } from "@/components";
import { usePokemon, useTypes } from "@/hooks";

const HomePage = () => {
  const {
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
  } = usePokemon();

  const { types, loading: typesLoading } = useTypes();

  return (
    <div className="relative min-h-screen bg-[var(--background)] overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-t from[var(--primary)] via[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent">
              Pokégie
            </span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-base">
            gotta catch em all
          </p>
        </div>

        <div className="mb-8">
          <TypeFilterChips
            types={types}
            loading={typesLoading}
            selected={selectedTypes}
            onChange={setSelectedTypes}
          />
        </div>

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        )}

        {!error && pokemonList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {pokemonList.map((pokemon) => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                types={pokemon.types}
                onClick={() => selectPokemon(pokemon.id)}
              />
            ))}
          </div>
        )}

        {!error && !loading && pokemonList.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-[var(--muted-foreground)] font-medium">
              No Pokémon match the selected type.
            </p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="bg-[var(--muted)] rounded-2xl h-48 animate-pulse"
              />
            ))}
          </div>
        )}
      </main>
      <div ref={bottomRef} />

      <PokemonModal
        pokemon={selectedPokemon}
        loading={detailLoading}
        error={detailError}
        onClose={clearSelectedPokemon}
      />
    </div>
  );
};

export default HomePage;
