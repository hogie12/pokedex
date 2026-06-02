interface PokemonCardProps {
  name: string;
  imageUrl: string;
  type: string;
}
function PokemonCard({ name, imageUrl, type }: PokemonCardProps) {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{type}</p>
    </div>
  );
}

export default PokemonCard;
