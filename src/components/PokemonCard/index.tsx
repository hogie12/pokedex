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
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-2 hover:scale-110 transition-all duration-300"
    >
      <div className="relative flex items-center justify-center pt-5 pb-2">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-2xl bg-[var(--primary)] rounded-full scale-75" />
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative"
          loading="lazy"
        />
      </div>

      <div className="px-4 pb-4 pt-2 text-center">
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
