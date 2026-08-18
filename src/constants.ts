import type { Continent } from './types/landmark';
import type { TimeOfDay, WeatherCategory } from './types/weather';

export const CONTINENT_LABELS_KO: Record<Continent, string> = {
  asia: '아시아',
  europe: '유럽',
  'north-america': '북미',
  'south-america': '남미',
  africa: '아프리카',
  oceania: '오세아니아',
};

export const WEATHER_CATEGORY_LABELS_KO: Record<WeatherCategory, string> = {
  clear: '맑음',
  cloudy: '구름많음',
  overcast: '흐림',
  fog: '안개',
  rain: '비',
  snow: '눈',
  thunderstorm: '뇌우',
};

export const TIME_OF_DAY_LABELS_KO: Record<TimeOfDay, string> = {
  day: '낮',
  sunset: '노을',
  night: '밤',
};

/** 날씨 캐시 TTL (5분) */
export const WEATHER_CACHE_TTL_MS = 5 * 60 * 1000;

/** 이 시간 이상 로딩되면 "오래 걸리고 있어요" 안내 노출 */
export const SLOW_LOADING_MS = 5000;
