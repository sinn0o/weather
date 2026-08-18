import type { Landmark } from '../types/landmark';
import type { FilterState } from '../types/filter';
import type { WeatherResult } from '../types/weather';

export type CardDataStatus = 'loading' | 'ready' | 'error';

/**
 * 대륙 필터는 즉시 판단 가능하지만, 날씨상태/낮밤 필터는 해당 카드의 날씨 데이터가
 * 준비돼야 판단할 수 있다. 날씨/시간 필터가 하나라도 켜져 있는데 아직 로딩 중이거나
 * 실패한 카드는 "아직 확정되지 않음"으로 보고 목록에서 제외한다(데이터가 오면 재평가됨).
 */
export function matchesFilters(
  landmark: Landmark,
  weather: WeatherResult | undefined,
  status: CardDataStatus,
  filters: FilterState,
): boolean {
  if (filters.continents.length > 0 && !filters.continents.includes(landmark.continent)) {
    return false;
  }

  const needsWeatherData = filters.weatherCategories.length > 0 || filters.timeOfDay.length > 0;
  if (!needsWeatherData) return true;

  if (status !== 'ready' || !weather) return false;

  if (
    filters.weatherCategories.length > 0 &&
    !filters.weatherCategories.includes(weather.category)
  ) {
    return false;
  }

  if (filters.timeOfDay.length > 0 && !filters.timeOfDay.includes(weather.timeOfDay)) {
    return false;
  }

  return true;
}
