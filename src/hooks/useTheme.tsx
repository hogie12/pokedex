import type { Theme, ThemeName } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const ALL_THEME_CLASSES = [
  "light-bulbasaur",
  "dark-bulbasaur",
  "light-squirtle",
  "dark-squirtle",
  "light-charmander",
  "dark-charmander",
];

function readStorage<T extends string>(key: string, fallback: T): T {
  return (localStorage.getItem(key) as T | null) ?? fallback;
}

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  toggle: () => void;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    readStorage<Theme>("pokegie-theme", "dark"),
  );
  const [themeName, setThemeName] = useState<ThemeName>(() =>
    readStorage<ThemeName>("pokegie-theme-name", "bulbasaur"),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...ALL_THEME_CLASSES);
    root.classList.add(`${theme}-${themeName}`);
    localStorage.setItem("pokegie-theme", theme);
    localStorage.setItem("pokegie-theme-name", themeName);
  }, [theme, themeName]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggle, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
