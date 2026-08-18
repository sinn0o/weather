import type { SilhouetteProps } from './types';

export function ChristTheRedeemer({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="거대한 예수상"
    >
      <polygon points="0,290 100,180 200,290" fill={fill} opacity="0.5" />
      <rect x="93" y="150" width="14" height="90" fill={fill} />
      <rect x="50" y="150" width="100" height="10" fill={fill} />
      <circle cx="100" cy="135" r="10" fill={fill} />
    </svg>
  );
}
