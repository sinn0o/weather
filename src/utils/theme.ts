import type { TimeOfDay, WeatherCategory } from '../types/weather';

/** 낮/노을/밤 하늘 그라디언트. 카드 썸네일과 씬 배경(SkyLayer)이 공유한다. */
export const SKY_GRADIENT_CLASSES: Record<TimeOfDay, string> = {
  day: 'from-sky-400 via-sky-300 to-sky-100',
  sunset: 'from-indigo-500 via-orange-400 to-amber-200',
  night: 'from-slate-950 via-indigo-950 to-slate-800',
};

/** 하늘 위에 얹는 날씨별 톤 보정 (채도/명도) */
export const WEATHER_TINT_CLASSES: Record<WeatherCategory, string> = {
  clear: '',
  cloudy: 'saturate-75 brightness-95',
  overcast: 'saturate-50 brightness-90',
  fog: 'saturate-40 brightness-105',
  rain: 'saturate-75 brightness-75',
  snow: 'saturate-40 brightness-110',
  thunderstorm: 'saturate-60 brightness-60',
};

/** 밤/노을 배경 위에서 텍스트가 항상 잘 읽히도록 하는 전경색 (명도 대비 확보용) */
export const LIGHT_TEXT_TIME_OF_DAY: TimeOfDay[] = ['night'];
