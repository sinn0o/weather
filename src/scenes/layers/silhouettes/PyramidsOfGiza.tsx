import type { SilhouetteProps } from './types';

export function PyramidsOfGiza({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#2a2318';
  return (
    <svg
      viewBox="0 0 300 180"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="기자의 피라미드"
    >
      <polygon points="60,160 110,80 160,160" fill={fill} />
      <polygon points="130,160 190,60 250,160" fill={fill} />
      <polygon points="200,160 235,100 270,160" fill={fill} opacity="0.85" />
      <rect x="0" y="158" width="300" height="4" fill={fill} />
    </svg>
  );
}
