import type { Landmark } from '../../types/landmark';
import type { WeatherResult } from '../../types/weather';
import type { CardDataStatus } from '../../utils/filter';
import { WeatherIcon } from '../icons/WeatherIcon';
import { WEATHER_CATEGORY_LABELS_KO, TIME_OF_DAY_LABELS_KO } from '../../constants';
import { SKY_GRADIENT_CLASSES, WEATHER_TINT_CLASSES } from '../../utils/theme';
import { formatTempC } from '../../utils/format';
import { SILHOUETTE_REGISTRY } from '../../scenes/layers/silhouettes/registry';
import { GenericSilhouette } from '../../scenes/layers/silhouettes/GenericSilhouette';

interface LandmarkCardProps {
  landmark: Landmark;
  status: CardDataStatus;
  weather?: WeatherResult;
  onOpen: (landmark: Landmark) => void;
  onRetry: (landmark: Landmark) => void;
}

export function LandmarkCard({ landmark, status, weather, onOpen, onRetry }: LandmarkCardProps) {
  if (status === 'error') {
    return (
      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 p-4">
        <div>
          <p className="text-sm font-medium text-white">{landmark.cityNameKo}</p>
          <p className="text-xs text-slate-400">{landmark.landmarkNameKo}</p>
        </div>
        <p className="mt-4 text-sm text-rose-300">정보를 불러오지 못했어요</p>
        <button
          type="button"
          onClick={() => onRetry(landmark)}
          className="mt-2 self-start rounded-full border border-rose-300/40 px-3 py-1 text-xs text-rose-200 transition hover:bg-rose-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-300"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const thumbGradient =
    status === 'ready' && weather
      ? `${SKY_GRADIENT_CLASSES[weather.timeOfDay]} ${WEATHER_TINT_CLASSES[weather.category]}`
      : 'from-slate-700 via-slate-600 to-slate-700';
  const thumbTimeOfDay = status === 'ready' && weather ? weather.timeOfDay : 'day';
  const Silhouette = SILHOUETTE_REGISTRY[landmark.illustrationSet];

  return (
    <button
      type="button"
      onClick={() => onOpen(landmark)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
    >
      <div className={`relative h-28 overflow-hidden bg-gradient-to-b sm:h-32 ${thumbGradient}`}>
        {Silhouette ? (
          <Silhouette className="absolute inset-x-3 bottom-0 h-16 opacity-90 sm:h-20" timeOfDay={thumbTimeOfDay} />
        ) : (
          <GenericSilhouette
            className="absolute inset-x-3 bottom-0 h-16 opacity-90 sm:h-20"
            timeOfDay={thumbTimeOfDay}
            label={landmark.landmarkNameKo}
          />
        )}
        {status === 'ready' && weather && (
          <WeatherIcon
            category={weather.category}
            className="absolute bottom-2 right-2 h-8 w-8 text-white/90 drop-shadow"
          />
        )}
        <span className="absolute left-3 top-2 text-xs font-medium text-white/80">
          {landmark.landmarkNameKo}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm font-semibold text-white">{landmark.cityNameKo}</p>
        <p className="text-xs text-slate-400">{landmark.countryKo}</p>

        {status === 'ready' && weather ? (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-semibold text-white">{formatTempC(weather.tempC)}</span>
            <span className="text-xs text-slate-300">
              {WEATHER_CATEGORY_LABELS_KO[weather.category]} ·{' '}
              {TIME_OF_DAY_LABELS_KO[weather.timeOfDay]}
            </span>
          </div>
        ) : (
          <div className="mt-2 h-6 w-16 animate-pulse rounded bg-slate-700/60" />
        )}
      </div>
    </button>
  );
}
