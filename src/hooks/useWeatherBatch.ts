import { useCallback, useEffect, useRef, useState } from 'react';
import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { fetchBatchWeather, fetchSingleWeather } from '../api/openMeteo';
import { getCached, setCached } from '../utils/cache';
import { WEATHER_CACHE_TTL_MS } from '../constants';

const BATCH_CACHE_KEY = 'weather-batch-v1';

interface State {
  dataById: Record<string, WeatherResult>;
  loadingIds: Set<string>;
  errorIds: Set<string>;
  globalError: boolean;
}

export function useWeatherBatch(landmarks: Landmark[]) {
  const [state, setState] = useState<State>({
    dataById: {},
    loadingIds: new Set(),
    errorIds: new Set(),
    globalError: false,
  });

  // load()가 항상 최신 landmarks를 보도록 ref로 보관 (의존성 배열을 안정적으로 유지)
  const landmarksRef = useRef(landmarks);
  landmarksRef.current = landmarks;

  const load = useCallback((force = false) => {
    const currentLandmarks = landmarksRef.current;

    if (!force) {
      const cached = getCached<Record<string, WeatherResult>>(BATCH_CACHE_KEY, WEATHER_CACHE_TTL_MS);
      if (cached) {
        setState({
          dataById: cached,
          loadingIds: new Set(),
          errorIds: new Set(),
          globalError: false,
        });
        return;
      }
    }

    setState((prev) => ({
      ...prev,
      loadingIds: new Set(currentLandmarks.map((l) => l.id)),
      globalError: false,
    }));

    fetchBatchWeather(currentLandmarks)
      .then((items) => {
        const dataById: Record<string, WeatherResult> = {};
        const errorIds = new Set<string>();
        for (const item of items) {
          if (item.data) dataById[item.id] = item.data;
          else errorIds.add(item.id);
        }
        setCached(BATCH_CACHE_KEY, dataById);
        setState({ dataById, loadingIds: new Set(), errorIds, globalError: false });
      })
      .catch(() => {
        // fetchBatchWeather가 던지는 에러는 네트워크/HTTP 실패 등 요청 전체 실패를 의미한다.
        setState((prev) => ({
          ...prev,
          loadingIds: new Set(),
          globalError: true,
        }));
      });
  }, []);

  useEffect(() => {
    load(false);
    // landmarks 목록 자체는 정적 데이터이므로 마운트 시 1회만 로드
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetchOne = useCallback((id: string) => {
    const landmark = landmarksRef.current.find((l) => l.id === id);
    if (!landmark) return;

    setState((prev) => ({
      ...prev,
      loadingIds: new Set(prev.loadingIds).add(id),
      errorIds: (() => {
        const next = new Set(prev.errorIds);
        next.delete(id);
        return next;
      })(),
    }));

    fetchSingleWeather(landmark)
      .then((result) => {
        setState((prev) => {
          const loadingIds = new Set(prev.loadingIds);
          loadingIds.delete(id);
          const dataById = { ...prev.dataById, [id]: result };
          setCached(BATCH_CACHE_KEY, dataById);
          return { ...prev, dataById, loadingIds };
        });
      })
      .catch(() => {
        setState((prev) => {
          const loadingIds = new Set(prev.loadingIds);
          loadingIds.delete(id);
          const errorIds = new Set(prev.errorIds).add(id);
          return { ...prev, loadingIds, errorIds };
        });
      });
  }, []);

  return {
    dataById: state.dataById,
    loadingIds: state.loadingIds,
    errorIds: state.errorIds,
    globalError: state.globalError,
    refetch: (force = true) => load(force),
    refetchOne,
  };
}
