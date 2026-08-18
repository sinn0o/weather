import type { SilhouetteProps } from './types';

export function TokyoTower({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="도쿄타워"
    >
      <line x1="100" y1="5" x2="100" y2="30" stroke={fill} strokeWidth="3" />
      <polygon points="98,30 102,30 110,90 90,90" fill={fill} />
      <polygon points="90,90 110,90 122,160 78,160" fill={fill} />
      <polygon points="78,160 122,160 145,290 55,290" fill={fill} />
      <rect x="65" y="155" width="70" height="6" fill={fill} />
    </svg>
  );
}
