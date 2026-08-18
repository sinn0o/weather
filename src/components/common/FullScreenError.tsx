interface FullScreenErrorProps {
  onRetry: () => void;
}

export function FullScreenError({ onRetry }: FullScreenErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-lg font-semibold text-white">날씨 정보를 불러오지 못했어요</p>
      <p className="max-w-sm text-sm text-slate-400">
        네트워크 연결을 확인한 뒤 다시 시도해주세요.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200"
      >
        다시 시도
      </button>
    </div>
  );
}
