import type { SilhouetteProps } from './types';

interface GenericSilhouetteProps extends SilhouetteProps {
  label?: string;
}

/**
 * 아직 고유 실루엣이 등록되지 않은 랜드마크를 위한 폴백.
 * 새 도시를 추가할 때 registry.ts에 등록하지 않으면 자동으로 이 컴포넌트가 쓰인다.
 */
export function GenericSilhouette({ className, timeOfDay, label }: GenericSilhouetteProps) {
  const fill = timeOfDay === 'night' ? '#0b1220' : '#1e2430';
  return (
    <svg
      viewBox="0 0 300 200"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={label ?? '랜드마크 실루엣'}
    >
      <rect x="20" y="100" width="60" height="90" fill={fill} />
      <polygon points="20,100 80,100 50,60" fill={fill} />
      <rect x="110" y="70" width="50" height="120" fill={fill} />
      <rect x="190" y="120" width="70" height="70" fill={fill} />
      <rect x="205" y="90" width="10" height="30" fill={fill} />
    </svg>
  );
}
