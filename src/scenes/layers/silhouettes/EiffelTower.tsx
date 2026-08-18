import type { SilhouetteProps } from './types';

export function EiffelTower({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="에펠탑"
    >
      <polygon points="97,20 103,20 108,70 92,70" fill={fill} />
      <polygon points="92,70 108,70 118,130 82,130" fill={fill} />
      <polygon points="82,130 118,130 132,190 68,190" fill={fill} />
      <polygon points="68,190 132,190 160,290 40,290" fill={fill} />
      <rect x="55" y="185" width="90" height="8" fill={fill} />
      <rect x="70" y="125" width="60" height="6" fill={fill} />
    </svg>
  );
}
