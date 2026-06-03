import { useState } from "react";
import Modal from "@/components/Modal";
import { PokeballIcon } from "@/assets/icon";
import type { ThemeName } from "@/types";
import { useTheme } from "@/hooks";

const POKEMON_THEMES: {
  name: ThemeName;
  label: string;
  spriteId: number;
  colors: { light: string; dark: string };
}[] = [
  {
    name: "bulbasaur",
    label: "Bulbasaur",
    spriteId: 1,
    colors: { light: "#399494", dark: "#5abfbf" },
  },
  {
    name: "squirtle",
    label: "Squirtle",
    spriteId: 7,
    colors: { light: "#7ba4e6", dark: "#7aa3e6" },
  },
  {
    name: "charmander",
    label: "Charmander",
    spriteId: 4,
    colors: { light: "#ff9441", dark: "#ff9442" },
  },
];

const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

function ThemeSelector() {
  const { themeName, setThemeName, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(!localStorage.getItem("theme-selected"));

  return (
    <>
      <button
        id="theme-selector"
        onClick={() => setIsOpen(true)}
        aria-label="Choose Pokémon theme"
        title="Choose Pokémon theme"
        className="fixed bottom-6 right-[5.5rem] z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-[var(--card)]  cursor-pointer"
      >
        <img
          src={PokeballIcon}
          alt="Pokeball"
          className="w-full h-full object-contain drop-shadow"
        />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="Choose Pokémon theme"
        maxWidth="max-w-sm"
      >
        <div className="px-6 pt-8 pb-6">
          <h2 className="text-xl font-extrabold text-[var(--foreground)] text-center mb-3">
            Choose Your Pokemon
          </h2>
          <div className="flex flex-col gap-3">
            {POKEMON_THEMES.map((t) => {
              const isActive = themeName === t.name;
              const accentColor =
                theme === "dark" ? t.colors.dark : t.colors.light;
              return (
                <button
                  key={t.name}
                  onClick={() => {
                    setThemeName(t.name);
                    setIsOpen(false);
                    localStorage.setItem("theme-selected", "true");
                  }}
                  className={`
                    flex items-center gap-4 w-full rounded-2xl px-4 py-3
                    border-2 transition-all duration-200 cursor-pointer
                    hover:scale-[1.02] active:scale-[0.98]
                    ${
                      isActive
                        ? "border-[var(--primary)] bg-[var(--muted)]"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50"
                    }
                  `}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}22` }}
                  >
                    <img
                      src={`${SPRITE_BASE}/${t.spriteId}.png`}
                      alt={t.label}
                      className="w-11 h-11 object-contain drop-shadow"
                    />
                  </div>

                  <div className="text-left flex-1">
                    <p className="font-bold text-[var(--foreground)]">
                      {t.label}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-white/30"
                      style={{ backgroundColor: accentColor }}
                    />
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--primary)]"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ThemeSelector;
