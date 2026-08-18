interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
        active
          ? 'border-sky-400 bg-sky-400/20 text-sky-200'
          : 'border-white/15 text-slate-300 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}
