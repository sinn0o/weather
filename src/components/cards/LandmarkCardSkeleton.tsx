export function LandmarkCardSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60"
      aria-hidden="true"
    >
      <div className="h-28 bg-slate-700/60 sm:h-32" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-slate-700/60" />
        <div className="h-3 w-1/3 rounded bg-slate-700/50" />
        <div className="mt-3 h-6 w-1/2 rounded bg-slate-700/50" />
      </div>
    </div>
  );
}
