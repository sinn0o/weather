import type { SilhouetteProps } from './types';

export function SydneyOperaHouse({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 300 200"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="시드니 오페라 하우스"
    >
      <rect x="20" y="170" width="260" height="20" fill={fill} />
      <path d="M40 170 C40 120 70 90 100 90 C90 130 80 160 80 170 Z" fill={fill} />
      <path d="M90 170 C90 110 130 70 170 70 C155 120 135 155 135 170 Z" fill={fill} />
      <path d="M140 170 C140 120 175 90 210 90 C195 130 175 160 175 170 Z" fill={fill} />
      <path d="M190 170 C190 135 215 110 245 110 C232 140 218 160 218 170 Z" fill={fill} />
    </svg>
  );
}
