export type WeatherCategory =
  | 'clear'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'thunderstorm';

export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface WeatherResult {
  tempC: number;
  feelsLikeC: number;
  humidityPct: number;
  windKmh: number;
  weatherCode: number;
  category: WeatherCategory;
  timeOfDay: TimeOfDay;
  /** 현지 시각 라벨, 예: '14:32' */
  localTimeLabel: string;
  utcOffsetSeconds: number;
  /** Date.now() 시점의 fetch 완료 시각 (캐시/"n분 전" 표시용) */
  fetchedAt: number;
}
