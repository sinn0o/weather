import type { Landmark } from '../../types/landmark';

interface SearchSuggestionListProps {
  results: Landmark[];
  fallbackSuggestions: Landmark[];
  onSelect: (landmark: Landmark) => void;
}

export function SearchSuggestionList({
  results,
  fallbackSuggestions,
  onSelect,
}: SearchSuggestionListProps) {
  if (results.length === 0) {
    return (
      <div className="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-slate-800 p-4 shadow-xl">
        <p className="text-sm text-slate-300">등록된 랜드마크가 없어요</p>
        <p className="mt-1 text-xs text-slate-500">이런 도시는 어떠세요?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {fallbackSuggestions.map((landmark) => (
            <button
              key={landmark.id}
              type="button"
              onClick={() => onSelect(landmark)}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white transition hover:bg-white/10"
            >
              {landmark.cityNameKo}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ul className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-white/10 bg-slate-800 shadow-xl">
      {results.slice(0, 6).map((landmark) => (
        <li key={landmark.id}>
          <button
            type="button"
            onClick={() => onSelect(landmark)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
          >
            <span>
              {landmark.cityNameKo} · {landmark.landmarkNameKo}
            </span>
            <span className="text-xs text-slate-400">{landmark.countryKo}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
