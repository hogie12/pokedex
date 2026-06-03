import { ATTRIBUTE_COLORS } from "@/const";
import { uppercaseFirstLetter } from "@/utils";

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  onClick?: () => void;
}

function PokemonCard({ name, imageUrl, types, onClick }: PokemonCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative"
          loading="lazy"
        />
      </div>

      <div className="px-4 pb-4 pt-3 text-center">
        <h2 className="text-base font-bold text-[var(--foreground)] mb-2 tracking-wide">
          {uppercaseFirstLetter(name)}
        </h2>
        <div className="flex gap-1.5 justify-center flex-wrap">
          {types.map((type) => (
            <span
              key={type}
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${ATTRIBUTE_COLORS[type] ?? "bg-gray-400 text-white"}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
