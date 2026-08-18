import type { Landmark } from '../../types/landmark';
import type { WeatherResult } from '../../types/weather';
import { LandmarkCard } from './LandmarkCard';
import { LandmarkCardSkeleton } from './LandmarkCardSkeleton';
import { EmptyState } from '../common/EmptyState';

interface LandmarkGridProps {
  landmarks: Landmark[];
  dataById: Record<string, WeatherResult>;
  loadingIds: Set<string>;
  errorIds: Set<string>;
  onOpen: (landmark: Landmark) => void;
  onRetry: (landmark: Landmark) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function LandmarkGrid({
  landmarks,
  dataById,
  loadingIds,
  errorIds,
  onOpen,
  onRetry,
  hasActiveFilters,
  onResetFilters,
}: LandmarkGridProps) {
  if (landmarks.length === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? '조건에 맞는 랜드마크가 없어요' : '등록된 랜드마크가 없어요'}
        description={
          hasActiveFilters ? '필터나 검색어를 조정해보세요.' : '다른 검색어로 시도해보세요.'
        }
        actionLabel={hasActiveFilters ? '필터 초기화' : undefined}
        onAction={hasActiveFilters ? onResetFilters : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {landmarks.map((landmark) => {
        if (loadingIds.has(landmark.id)) {
          return <LandmarkCardSkeleton key={landmark.id} />;
        }
        const status = errorIds.has(landmark.id) ? 'error' : dataById[landmark.id] ? 'ready' : 'loading';
        return (
          <LandmarkCard
            key={landmark.id}
            landmark={landmark}
            status={status}
            weather={dataById[landmark.id]}
            onOpen={onOpen}
            onRetry={onRetry}
          />
        );
      })}
    </div>
  );
}
