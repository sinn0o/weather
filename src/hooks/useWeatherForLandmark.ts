import { useCallback, useEffect, useState } from 'react';
import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { fetchSingleWeather } from '../api/openMeteo';
import { getCached, setCached } from '../utils/cache';
import { WEATHER_CACHE_TTL_MS } from '../constants';

const BATCH_CACHE_KEY = 'weather-batch-v1';
const singleCacheKey = (id: string) => `weather-single-${id}`;

export type SceneWeatherStatus = 'loading' | 'ready' | 'error';

/** 씬 화면 진입 시 사용. 리스트 배치 캐시에 값이 있으면 재사용해 중복 요청을 피한다. */
export function useWeatherForLandmark(landmark: Landmark) {
  const [data, setData] = useState<WeatherResult | null>(null);
  const [status, setStatus] = useState<SceneWeatherStatus>('loading');

  const load = useCallback(
    async (force = false) => {
      if (!force) {
        const batchCache = getCached<Record<string, WeatherResult>>(
          BATCH_CACHE_KEY,
          WEATHER_CACHE_TTL_MS,
        );
        if (batchCache?.[landmark.id]) {
          setData(batchCache[landmark.id]);
          setStatus('ready');
          return;
        }

        const singleCache = getCached<WeatherResult>(
          singleCacheKey(landmark.id),
          WEATHER_CACHE_TTL_MS,
        );
        if (singleCache) {
          setData(singleCache);
          setStatus('ready');
          return;
        }
      }

      setStatus('loading');
      try {
        const result = await fetchSingleWeather(landmark);
        setCached(singleCacheKey(landmark.id), result);
        setData(result);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    },
    [landmark],
  );

  useEffect(() => {
    load(false);
  }, [load]);

  return { data, status, refetch: () => load(true) };
}
