import { useEffect, useState } from 'react';
import { getLocalHourMinute } from '../utils/timeOfDay';

/** 지정한 타임존의 현재 시/분을 분 단위로 갱신해 반환한다. */
export function useNowInTimezone(timezone: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { hour, minute } = getLocalHourMinute(timezone, now);
  const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  return { hour, minute, label };
}
