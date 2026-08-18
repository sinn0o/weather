import { AnimatePresence, motion } from 'framer-motion';
import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { WeatherIcon } from '../components/icons/WeatherIcon';
import { formatTempC } from '../utils/format';

interface LandmarkListSheetProps {
  landmarks: Landmark[];
  dataById: Record<string, WeatherResult>;
  activeLandmarkId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (landmark: Landmark) => void;
}

/** 씬 화면에서 다른 랜드마크로 바로 이동할 수 있는 목록. 모바일은 바텀시트, 데스크톱은 사이드패널. */
export function LandmarkListSheet({
  landmarks,
  dataById,
  activeLandmarkId,
  isOpen,
  onClose,
  onSelect,
}: LandmarkListSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-slate-900 p-4 sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-80 sm:translate-y-0 sm:rounded-none sm:rounded-l-3xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">다른 랜드마크</p>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-white/60 transition hover:text-white"
              >
                닫기
              </button>
            </div>
            <ul className="space-y-1.5">
              {landmarks.map((landmark) => {
                const weather = dataById[landmark.id];
                const isActive = landmark.id === activeLandmarkId;
                return (
                  <li key={landmark.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(landmark)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                        isActive
                          ? 'bg-sky-500/20 text-sky-200'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span>{landmark.cityNameKo}</span>
                      {weather && (
                        <span className="flex items-center gap-1 text-xs text-white/60">
                          <WeatherIcon category={weather.category} className="h-4 w-4" />
                          {formatTempC(weather.tempC)}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
