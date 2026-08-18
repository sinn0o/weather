import type { Continent } from './landmark';
import type { TimeOfDay, WeatherCategory } from './weather';

export interface FilterState {
  weatherCategories: WeatherCategory[];
  continents: Continent[];
  timeOfDay: TimeOfDay[];
}

export const EMPTY_FILTER_STATE: FilterState = {
  weatherCategories: [],
  continents: [],
  timeOfDay: [],
};

export function isFilterEmpty(filters: FilterState): boolean {
  return (
    filters.weatherCategories.length === 0 &&
    filters.continents.length === 0 &&
    filters.timeOfDay.length === 0
  );
}
