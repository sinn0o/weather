import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
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

  // 마우스 커서를 따라다니는 은은한 빛 효과: 위치는 리렌더 없이 CSS 변수로 직접 갱신한다.
  const glowRef = useRef<HTMLDivElement>(null);
  const [isGlowVisible, setIsGlowVisible] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    glowRef.current?.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
    glowRef.current?.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    if (!isGlowVisible) setIsGlowVisible(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsGlowVisible(false)}
      className="fixed inset-0 z-40 overflow-hidden bg-slate-950"
    >
      {data && (
        <>
          <SkyLayer timeOfDay={data.timeOfDay} />
          <WeatherEffectLayer category={data.category} timeOfDay={data.timeOfDay} />
          <SilhouetteLayer landmark={landmark} timeOfDay={data.timeOfDay} />
        </>
      )}

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ease-out [mix-blend-mode:screen]"
        style={{
          opacity: isGlowVisible ? 1 : 0,
          background:
            'radial-gradient(500px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.16), transparent 70%)',
        }}
      />

      <div className="relative z-20 flex h-full flex-col">
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

        <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
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
