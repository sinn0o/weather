import { AnimatePresence, motion } from 'framer-motion';
import type { TimeOfDay } from '../../types/weather';
import { SKY_GRADIENT_CLASSES } from '../../utils/theme';

interface SkyLayerProps {
  timeOfDay: TimeOfDay;
}

/** 낮/노을/밤 하늘 그라디언트 레이어. timeOfDay가 바뀔 때 크로스페이드로 전환된다. */
export function SkyLayer({ timeOfDay }: SkyLayerProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={timeOfDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-b ${SKY_GRADIENT_CLASSES[timeOfDay]}`}
        />
      </AnimatePresence>
    </div>
  );
}
