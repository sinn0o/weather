import { useEffect, useRef, useState } from 'react';
import type { Landmark } from '../../types/landmark';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { searchLandmarks } from '../../utils/search';
import { SearchSuggestionList } from './SearchSuggestionList';

interface SearchBarProps {
  landmarks: Landmark[];
  query: string;
  onQueryChange: (query: string) => void;
  onSelect: (landmark: Landmark) => void;
}

export function SearchBar({ landmarks, query, onQueryChange, onSelect }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 150);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = debouncedQuery.trim();
  const results = trimmed ? searchLandmarks(landmarks, trimmed) : [];
  const showDropdown = isFocused && trimmed.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="도시나 랜드마크 검색 (예: 파리, Tokyo)"
        className="w-full rounded-full border border-white/15 bg-slate-800/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
        aria-label="랜드마크 검색"
      />
      {showDropdown && (
        <SearchSuggestionList
          results={results}
          fallbackSuggestions={landmarks.slice(0, 4)}
          onSelect={(landmark) => {
            onSelect(landmark);
            setIsFocused(false);
          }}
        />
      )}
    </div>
  );
}
