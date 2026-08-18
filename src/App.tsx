import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LANDMARKS } from './data/landmarks';
import { useWeatherBatch } from './hooks/useWeatherBatch';
import { useSlowLoading } from './hooks/useSlowLoading';
import { searchLandmarks } from './utils/search';
import { matchesFilters } from './utils/filter';
import type { CardDataStatus } from './utils/filter';
import { EMPTY_FILTER_STATE, isFilterEmpty } from './types/filter';
import type { FilterState } from './types/filter';
import type { Landmark } from './types/landmark';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { FilterBar } from './components/filters/FilterBar';
import { LandmarkGrid } from './components/cards/LandmarkGrid';
import { FullScreenError } from './components/common/FullScreenError';
import { SlowLoadingHint } from './components/common/SlowLoadingHint';
import { SceneView } from './scenes/SceneView';

function App() {
  const { dataById, loadingIds, errorIds, globalError, refetch, refetchOne } =
    useWeatherBatch(LANDMARKS);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTER_STATE);
  const [activeLandmarkId, setActiveLandmarkId] = useState<string | null>(null);

  const isSlowLoading = useSlowLoading(loadingIds.size > 0);

  const visibleLandmarks = useMemo(() => {
    const searched = searchLandmarks(LANDMARKS, query);
    return searched.filter((landmark) => {
      const status: CardDataStatus = errorIds.has(landmark.id)
        ? 'error'
        : loadingIds.has(landmark.id)
          ? 'loading'
          : 'ready';
      return matchesFilters(landmark, dataById[landmark.id], status, filters);
    });
  }, [query, filters, dataById, loadingIds, errorIds]);

  function handleResetFilters() {
    setFilters(EMPTY_FILTER_STATE);
    setQuery('');
  }

  function handleOpen(landmark: Landmark) {
    setActiveLandmarkId(landmark.id);
  }

  const activeLandmark = LANDMARKS.find((l) => l.id === activeLandmarkId) ?? null;
  const hasActiveFilters = !isFilterEmpty(filters) || query.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="flex justify-center sm:justify-start">
          <SearchBar
            landmarks={LANDMARKS}
            query={query}
            onQueryChange={setQuery}
            onSelect={handleOpen}
          />
        </div>

        <div className="mt-4">
          <FilterBar filters={filters} onChange={setFilters} onReset={handleResetFilters} />
        </div>

        <div className="mt-6">
          {globalError ? (
            <FullScreenError onRetry={() => refetch(true)} />
          ) : (
            <>
              {isSlowLoading && <SlowLoadingHint />}
              <LandmarkGrid
                landmarks={visibleLandmarks}
                dataById={dataById}
                loadingIds={loadingIds}
                errorIds={errorIds}
                onOpen={handleOpen}
                onRetry={(landmark) => refetchOne(landmark.id)}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </>
          )}
        </div>
      </main>

      <AnimatePresence>
        {activeLandmark && (
          <SceneView
            key="scene-view"
            landmark={activeLandmark}
            landmarks={LANDMARKS}
            dataById={dataById}
            onBack={() => setActiveLandmarkId(null)}
            onSelectLandmark={(l) => setActiveLandmarkId(l.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
