import type { SilhouetteProps } from './types';

export function TajMahal({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#2a2a2a';
  return (
    <svg
      viewBox="0 0 300 200"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="타지마할"
    >
      <rect x="90" y="120" width="120" height="70" fill={fill} />
      <path d="M110 120 C110 80 190 80 190 120 Z" fill={fill} />
      <rect x="140" y="70" width="20" height="30" fill={fill} />
      <circle cx="150" cy="65" r="8" fill={fill} />
      <rect x="40" y="100" width="10" height="90" fill={fill} />
      <polygon points="40,100 50,100 45,85" fill={fill} />
      <rect x="250" y="100" width="10" height="90" fill={fill} />
      <polygon points="250,100 260,100 255,85" fill={fill} />
      <rect x="70" y="130" width="10" height="60" fill={fill} />
      <polygon points="70,130 80,130 75,118" fill={fill} />
      <rect x="220" y="130" width="10" height="60" fill={fill} />
      <polygon points="220,130 230,130 225,118" fill={fill} />
    </svg>
  );
}
