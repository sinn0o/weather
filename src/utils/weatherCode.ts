import type { WeatherCategory } from '../types/weather';

/**
 * WMO Weather interpretation codes → 자체 정의 날씨 카테고리 매핑.
 * https://open-meteo.com/en/docs 의 WMO Weather Code 표 기준.
 */
const WMO_CATEGORY_MAP: Record<number, WeatherCategory> = {
  0: 'clear',
  1: 'clear',
  2: 'cloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'rain',
  53: 'rain',
  55: 'rain',
  56: 'rain',
  57: 'rain',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rain',
  85: 'snow',
  86: 'snow',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

/** 매핑되지 않은 코드는 'cloudy'로 안전하게 폴백한다. */
export function getWeatherCategory(code: number): WeatherCategory {
  return WMO_CATEGORY_MAP[code] ?? 'cloudy';
}
