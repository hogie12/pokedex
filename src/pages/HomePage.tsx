import { Card } from "@/components";
import usePokemon from "@/hooks/usePokemon";

const HomePage = () => {
  const { pokemonList, loading, error, bottomRef } = usePokemon();

  return (
    <div className="min-h-screen bg-linear-to-br from-[var(--background)] to-[var(--secondary)]">
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold mb-2">
            <span className="text-[var(--primary)]">Poké</span>
            <span className="text-[var(--accent)]">gie</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-base">
            Explore the first generation of Pokémon
          </p>
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
              />
            ))}
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
    </div>
  );
};

export default HomePage;
