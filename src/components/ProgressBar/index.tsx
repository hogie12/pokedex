interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

function ProgressBar({
  label,
  value,
  max = 255,
  color = "bg-gray-400",
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-[var(--muted-foreground)] w-16 shrink-0 text-right">
        {label}
      </span>
      <span className="text-xs font-bold text-[var(--foreground)] w-8 shrink-0 text-right">
        {value}
      </span>
      <div className="flex-1 bg-[var(--muted)] rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
