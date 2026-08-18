import type { SilhouetteProps } from './types';

export function BigBen({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 150 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="빅벤"
    >
      <rect x="50" y="120" width="50" height="170" fill={fill} />
      <rect x="45" y="100" width="60" height="20" fill={fill} />
      <circle cx="75" cy="90" r="18" fill="none" stroke={fill} strokeWidth="6" />
      <polygon points="45,80 105,80 75,20" fill={fill} />
      <rect x="70" y="8" width="10" height="15" fill={fill} />
    </svg>
  );
}
