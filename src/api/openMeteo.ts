import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { getWeatherCategory } from '../utils/weatherCode';
import { getLocalTimeLabel, getTimeOfDay } from '../utils/timeOfDay';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const CURRENT_FIELDS =
  'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day';

export class WeatherFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherFetchError';
  }
}

interface OpenMeteoCurrentResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds: number;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: 0 | 1;
  };
}

function buildBatchForecastUrl(landmarks: Landmark[]): string {
  const lat = landmarks.map((l) => l.lat).join(',');
  const lon = landmarks.map((l) => l.lon).join(',');
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: CURRENT_FIELDS,
    timezone: 'auto',
  });
  return `${BASE_URL}?${params.toString()}`;
}

function buildSingleForecastUrl(landmark: Landmark): string {
  const params = new URLSearchParams({
    latitude: String(landmark.lat),
    longitude: String(landmark.lon),
    current: CURRENT_FIELDS,
    timezone: 'auto',
  });
  return `${BASE_URL}?${params.toString()}`;
}

function toWeatherResult(raw: OpenMeteoCurrentResponse, landmark: Landmark): WeatherResult {
  const category = getWeatherCategory(raw.current.weather_code);
  const timeOfDay = getTimeOfDay(landmark.timezone);
  const localTimeLabel = getLocalTimeLabel(landmark.timezone);

  return {
    tempC: raw.current.temperature_2m,
    feelsLikeC: raw.current.apparent_temperature,
    humidityPct: raw.current.relative_humidity_2m,
    windKmh: raw.current.wind_speed_10m,
    weatherCode: raw.current.weather_code,
    category,
    timeOfDay,
    localTimeLabel,
    utcOffsetSeconds: raw.utc_offset_seconds,
    fetchedAt: Date.now(),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new WeatherFetchError('네트워크 요청에 실패했습니다.');
  }
  if (!res.ok) {
    throw new WeatherFetchError(`날씨 API 요청 실패 (status ${res.status})`);
  }
  return res.json();
}

export interface BatchWeatherItem {
  id: string;
  data: WeatherResult | null;
}

/**
 * 여러 랜드마크의 날씨를 단일 배치 요청으로 조회한다.
 * Open-Meteo는 위도/경도를 콤마로 이어 전달하면 위치별 결과 배열을 순서대로 반환한다.
 * 위치가 1개일 때는 배열이 아닌 단일 객체를 반환할 수 있어 정규화가 필요하다.
 *
 * 네트워크/HTTP 실패는 WeatherFetchError로 던져 "전체 실패"로 처리하고,
 * 개별 항목 변환 실패는 해당 항목만 data:null로 표시해 "부분 실패"를 지원한다.
 */
export async function fetchBatchWeather(landmarks: Landmark[]): Promise<BatchWeatherItem[]> {
  if (landmarks.length === 0) return [];

  const json = await fetchJson(buildBatchForecastUrl(landmarks));
  const list: OpenMeteoCurrentResponse[] = Array.isArray(json)
    ? (json as OpenMeteoCurrentResponse[])
    : [json as OpenMeteoCurrentResponse];

  if (list.length !== landmarks.length) {
    throw new WeatherFetchError('날씨 응답 개수가 요청과 일치하지 않습니다.');
  }

  return landmarks.map((landmark, i) => {
    try {
      return { id: landmark.id, data: toWeatherResult(list[i], landmark) };
    } catch {
      return { id: landmark.id, data: null };
    }
  });
}

export async function fetchSingleWeather(landmark: Landmark): Promise<WeatherResult> {
  const json = await fetchJson(buildSingleForecastUrl(landmark));
  return toWeatherResult(json as OpenMeteoCurrentResponse, landmark);
}
