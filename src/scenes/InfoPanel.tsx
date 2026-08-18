import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { WeatherIcon } from '../components/icons/WeatherIcon';
import { WEATHER_CATEGORY_LABELS_KO, TIME_OF_DAY_LABELS_KO } from '../constants';
import { formatHumidityPct, formatMinutesAgo, formatTempC, formatWindKmh } from '../utils/format';
import { useNowInTimezone } from '../hooks/useNowInTimezone';

interface InfoPanelProps {
  landmark: Landmark;
  weather: WeatherResult;
  onRefresh: () => void;
}

export function InfoPanel({ landmark, weather, onRefresh }: InfoPanelProps) {
  const { label: liveTimeLabel } = useNowInTimezone(landmark.timezone);

  return (
    <div className="pointer-events-auto w-full rounded-t-3xl bg-black/40 p-5 text-white backdrop-blur-md sm:w-80 sm:rounded-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">{landmark.cityNameKo}</p>
          <p className="text-xs text-white/70">
            {landmark.countryKo} · {landmark.landmarkNameKo}
          </p>
        </div>
        <WeatherIcon category={weather.category} className="h-10 w-10 shrink-0 text-white" />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-bold">{formatTempC(weather.tempC)}</span>
        <span className="text-sm text-white/70">체감 {formatTempC(weather.feelsLikeC)}</span>
      </div>

      <p className="mt-1 text-sm text-white/80">
        {WEATHER_CATEGORY_LABELS_KO[weather.category]} · {TIME_OF_DAY_LABELS_KO[weather.timeOfDay]} ·
        현지시각 {liveTimeLabel}
      </p>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80">
        <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
          <dt>습도</dt>
          <dd>{formatHumidityPct(weather.humidityPct)}</dd>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
          <dt>풍속</dt>
          <dd>{formatWindKmh(weather.windKmh)}</dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center justify-between text-xs text-white/50">
        <span>{formatMinutesAgo(weather.fetchedAt)}</span>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-full border border-white/20 px-2.5 py-1 text-white/80 transition hover:bg-white/10"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
