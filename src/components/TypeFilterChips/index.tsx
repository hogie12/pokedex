import { ATTRIBUTE_COLORS } from "@/const";

interface TypeFilterChipsProps {
  types: string[];
  loading?: boolean;
  selected: string;
  onChange: (type: string) => void;
}

function TypeFilterChips({
  types,
  loading = false,
  selected,
  onChange,
}: TypeFilterChipsProps) {
  const toggle = (type: string) => {
    onChange(selected === type ? "" : type);
  };

  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-16 rounded-full bg-[var(--muted)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {types.map((type) => {
        const colorClass = ATTRIBUTE_COLORS[type] ?? "bg-gray-400 text-white";

        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={`
              capitalize text-xs font-semibold px-3 py-1.5 rounded-full
              border-2 transition-all duration-200 cursor-pointer
              hover:scale-105 active:scale-95
              ${
                selected === type
                  ? `${colorClass} border-transparent shadow-md`
                  : "bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--foreground)]"
              }
            `}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}

export default TypeFilterChips;
