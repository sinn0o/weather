interface SceneErrorProps {
  onRetry: () => void;
  onBack: () => void;
}

export function SceneError({ onRetry, onBack }: SceneErrorProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-16 text-center text-white">
      <p className="text-lg font-semibold">날씨 정보를 불러오지 못했어요</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-medium transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200"
        >
          다시 시도
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white/10"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
