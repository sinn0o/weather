import type { ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WeatherCategory } from '../../types/weather';
import type { EffectProps } from './effects/types';
import { ClearEffect } from './effects/ClearEffect';
import { CloudsEffect } from './effects/CloudsEffect';
import { FogEffect } from './effects/FogEffect';
import { RainEffect } from './effects/RainEffect';
import { SnowEffect } from './effects/SnowEffect';
import { ThunderEffect } from './effects/ThunderEffect';

const EFFECT_COMPONENTS: Record<WeatherCategory, ComponentType<EffectProps>> = {
  clear: ClearEffect,
  cloudy: CloudsEffect,
  overcast: CloudsEffect,
  fog: FogEffect,
  rain: RainEffect,
  snow: SnowEffect,
  thunderstorm: ThunderEffect,
};

interface WeatherEffectLayerProps extends EffectProps {
  category: WeatherCategory;
}

/** 날씨 카테고리별 파티클 효과 레이어. 하늘 배경과 독립적으로 크로스페이드된다. */
export function WeatherEffectLayer({ category, timeOfDay }: WeatherEffectLayerProps) {
  const Effect = EFFECT_COMPONENTS[category];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Effect timeOfDay={timeOfDay} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
