interface SceneLoadingProps {
  showSlowHint?: boolean;
}

export function SceneLoading({ showSlowHint }: SceneLoadingProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 py-16 text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <p className="text-sm text-white/70">씬을 불러오는 중...</p>
      {showSlowHint && (
        <p className="text-xs text-white/50" role="status">
          시간이 조금 걸리고 있어요...
        </p>
      )}
    </div>
  );
}
