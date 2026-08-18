import { AnimatePresence, motion } from 'framer-motion';
import type { Landmark } from '../../types/landmark';
import type { TimeOfDay } from '../../types/weather';
import { SILHOUETTE_REGISTRY } from './silhouettes/registry';
import { GenericSilhouette } from './silhouettes/GenericSilhouette';

interface SilhouetteLayerProps {
  landmark: Landmark;
  timeOfDay: TimeOfDay;
}

/** 도시별 고유 SVG 실루엣 레이어. 하늘/날씨 레이어와 독립적으로 크로스페이드된다. */
export function SilhouetteLayer({ landmark, timeOfDay }: SilhouetteLayerProps) {
  const Silhouette = SILHOUETTE_REGISTRY[landmark.illustrationSet];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={landmark.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl px-6"
        >
          {Silhouette ? (
            <Silhouette className="h-56 w-full sm:h-72" timeOfDay={timeOfDay} />
          ) : (
            <GenericSilhouette
              className="h-56 w-full sm:h-72"
              timeOfDay={timeOfDay}
              label={landmark.landmarkNameKo}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
