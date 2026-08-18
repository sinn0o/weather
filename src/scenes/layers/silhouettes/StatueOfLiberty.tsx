import type { SilhouetteProps } from './types';

export function StatueOfLiberty({ className, timeOfDay }: SilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="자유의 여신상"
    >
      <rect x="60" y="230" width="80" height="60" fill={fill} />
      <rect x="70" y="210" width="60" height="20" fill={fill} />
      <path d="M85 210 C80 160 78 130 90 100 L110 100 C122 130 120 160 115 210 Z" fill={fill} />
      <circle cx="100" cy="90" r="12" fill={fill} />
      <polygon points="85,80 90,58 95,80" fill={fill} />
      <polygon points="95,78 100,53 105,78" fill={fill} />
      <polygon points="105,80 110,58 115,80" fill={fill} />
      <path d="M112 105 L134 72 L140 66" stroke={fill} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="132" y="54" width="10" height="16" fill={fill} />
      <polygon points="130,54 144,54 137,38" fill={fill} />
    </svg>
  );
}
