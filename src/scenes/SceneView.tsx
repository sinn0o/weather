import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Landmark } from '../types/landmark';
import type { WeatherResult } from '../types/weather';
import { useWeatherForLandmark } from '../hooks/useWeatherForLandmark';
import { useSlowLoading } from '../hooks/useSlowLoading';
import { SkyLayer } from './layers/SkyLayer';
import { WeatherEffectLayer } from './layers/WeatherEffectLayer';
import { SilhouetteLayer } from './layers/SilhouetteLayer';
import { InfoPanel } from './InfoPanel';
import { SceneLoading } from './SceneLoading';
import { SceneError } from './SceneError';
import { LandmarkListSheet } from './LandmarkListSheet';

interface SceneViewProps {
  landmark: Landmark;
  landmarks: Landmark[];
  dataById: Record<string, WeatherResult>;
  onBack: () => void;
  onSelectLandmark: (landmark: Landmark) => void;
}

export function SceneView({ landmark, landmarks, dataById, onBack, onSelectLandmark }: SceneViewProps) {
  const { data, status, refetch } = useWeatherForLandmark(landmark);
  const isSlow = useSlowLoading(status === 'loading');
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-40 overflow-hidden bg-slate-950"
    >
      {data && (
        <>
          <SkyLayer timeOfDay={data.timeOfDay} />
          <WeatherEffectLayer category={data.category} timeOfDay={data.timeOfDay} />
          <SilhouetteLayer landmark={landmark} timeOfDay={data.timeOfDay} />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            ← 목록으로
          </button>
          <button
            type="button"
            onClick={() => setIsListOpen(true)}
            className="rounded-full bg-black/30 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            다른 랜드마크
          </button>
        </div>

        <div className="flex flex-1 items-end justify-center sm:items-center sm:justify-end sm:p-6">
          {status === 'loading' && <SceneLoading showSlowHint={isSlow} />}
          {status === 'error' && <SceneError onRetry={refetch} onBack={onBack} />}
          {status === 'ready' && data && (
            <InfoPanel landmark={landmark} weather={data} onRefresh={refetch} />
          )}
        </div>
      </div>

      <LandmarkListSheet
        landmarks={landmarks}
        dataById={dataById}
        activeLandmarkId={landmark.id}
        isOpen={isListOpen}
        onClose={() => setIsListOpen(false)}
        onSelect={(next) => {
          onSelectLandmark(next);
          setIsListOpen(false);
        }}
      />
    </motion.div>
  );
}
