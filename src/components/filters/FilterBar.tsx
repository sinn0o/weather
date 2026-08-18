import type { ReactNode } from 'react';
import type { Continent } from '../../types/landmark';
import type { FilterState } from '../../types/filter';
import { isFilterEmpty } from '../../types/filter';
import type { TimeOfDay, WeatherCategory } from '../../types/weather';
import {
  CONTINENT_LABELS_KO,
  TIME_OF_DAY_LABELS_KO,
  WEATHER_CATEGORY_LABELS_KO,
} from '../../constants';
import { FilterChip } from './FilterChip';

const WEATHER_CATEGORIES = Object.keys(WEATHER_CATEGORY_LABELS_KO) as WeatherCategory[];
const CONTINENTS = Object.keys(CONTINENT_LABELS_KO) as Continent[];
const TIME_OF_DAY_OPTIONS = Object.keys(TIME_OF_DAY_LABELS_KO) as TimeOfDay[];

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  function toggleWeather(category: WeatherCategory) {
    const next = filters.weatherCategories.includes(category)
      ? filters.weatherCategories.filter((c) => c !== category)
      : [...filters.weatherCategories, category];
    onChange({ ...filters, weatherCategories: next });
  }

  function toggleContinent(continent: Continent) {
    const next = filters.continents.includes(continent)
      ? filters.continents.filter((c) => c !== continent)
      : [...filters.continents, continent];
    onChange({ ...filters, continents: next });
  }

  function toggleTimeOfDay(timeOfDay: TimeOfDay) {
    const next = filters.timeOfDay.includes(timeOfDay)
      ? filters.timeOfDay.filter((t) => t !== timeOfDay)
      : [...filters.timeOfDay, timeOfDay];
    onChange({ ...filters, timeOfDay: next });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-800/40 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
      <FilterGroup label="날씨">
        {WEATHER_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={WEATHER_CATEGORY_LABELS_KO[category]}
            active={filters.weatherCategories.includes(category)}
            onClick={() => toggleWeather(category)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="대륙">
        {CONTINENTS.map((continent) => (
          <FilterChip
            key={continent}
            label={CONTINENT_LABELS_KO[continent]}
            active={filters.continents.includes(continent)}
            onClick={() => toggleContinent(continent)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="낮/밤">
        {TIME_OF_DAY_OPTIONS.map((timeOfDay) => (
          <FilterChip
            key={timeOfDay}
            label={TIME_OF_DAY_LABELS_KO[timeOfDay]}
            active={filters.timeOfDay.includes(timeOfDay)}
            onClick={() => toggleTimeOfDay(timeOfDay)}
          />
        ))}
      </FilterGroup>

      {!isFilterEmpty(filters) && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 underline underline-offset-2 transition hover:text-white sm:ml-auto"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-xs text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
