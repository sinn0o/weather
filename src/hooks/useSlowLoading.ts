import { useEffect, useState } from 'react';
import { SLOW_LOADING_MS } from '../constants';

/** isLoading이 delayMs 이상 지속되면 true (예: "시간이 오래 걸리고 있어요" 안내용) */
export function useSlowLoading(isLoading: boolean, delayMs: number = SLOW_LOADING_MS): boolean {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSlow(false);
      return;
    }
    const timer = setTimeout(() => setSlow(true), delayMs);
    return () => clearTimeout(timer);
  }, [isLoading, delayMs]);

  return slow;
}
