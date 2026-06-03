import type { PokemonFull } from "@/types";
import { ATTRIBUTE_COLORS, STAT_COLORS, STAT_LABELS } from "@/const";
import { uppercaseFirstLetter } from "@/utils";
import Modal from "@/components/Modal";
import ProgressBar from "../ProgressBar";
import React from "react";

interface PokemonModalProps {
  pokemon: PokemonFull | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

function PokemonModal({ pokemon, loading, error, onClose }: PokemonModalProps) {
  const isOpen = loading || !!pokemon || !!error;

  const imageUrl =
    pokemon?.sprites.other["official-artwork"].front_default ??
    pokemon?.sprites.front_default ??
    "";

  const paddedId = pokemon ? String(pokemon.id).padStart(3, "0") : "";

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Pokémon detail">
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin" />
          <p className="text-[var(--muted-foreground)] text-sm">Loading...</p>
        </div>
      )}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      )}
      {pokemon && !loading && (
        <React.Fragment>
          <div className="relative flex flex-col items-center pt-8 pb-4 bg-gradient-to-b from-[var(--muted)] to-[var(--card)]">
            <span className="text-xs font-bold text-[var(--muted-foreground)] mb-1">
              #{paddedId}
            </span>
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-40 h-40 object-contain drop-shadow-xl"
            />
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--foreground)] tracking-wide">
              {uppercaseFirstLetter(pokemon.name)}
            </h2>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${ATTRIBUTE_COLORS[t.type.name] ?? "bg-gray-400 text-white"}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto px-6 pb-6 flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                {
                  label: "Height",
                  value: `${(pokemon.height / 10).toFixed(1)} m`,
                },
                {
                  label: "Weight",
                  value: `${(pokemon.weight / 10).toFixed(1)} kg`,
                },
                { label: "Base XP", value: pokemon.base_experience ?? "—" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-[var(--muted)] rounded-2xl py-3 px-2"
                >
                  <span className="text-xs text-[var(--muted-foreground)] font-medium">
                    {label}
                  </span>
                  <span className="text-sm font-bold text-[var(--foreground)] mt-1">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className={`text-xs font-medium px-3 py-1 rounded-full bg-[var(--muted)] text-[var(--foreground)] capitalize ${a.is_hidden ? "opacity-50 italic" : ""}`}
                  >
                    {a.ability.name.replace("-", " ")}
                    {a.is_hidden && " (hidden)"}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                Base Stats
              </h3>
              <div className="flex flex-col gap-2.5">
                {pokemon.stats.map((s) => (
                  <ProgressBar
                    key={s.stat.name}
                    label={
                      STAT_LABELS[s.stat.name] ?? s.stat.name.toUpperCase()
                    }
                    value={s.base_stat}
                    color={STAT_COLORS[s.stat.name] ?? "bg-gray-400"}
                  />
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
}

export default PokemonModal;
