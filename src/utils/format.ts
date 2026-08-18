export function formatTempC(tempC: number): string {
  return `${Math.round(tempC)}°C`;
}

export function formatWindKmh(windKmh: number): string {
  return `${Math.round(windKmh)} km/h`;
}

export function formatHumidityPct(pct: number): string {
  return `${Math.round(pct)}%`;
}

/** fetchedAt(ms) 기준 "n분 전" 라벨 */
export function formatMinutesAgo(fetchedAt: number, now: number = Date.now()): string {
  const minutes = Math.max(0, Math.floor((now - fetchedAt) / 60000));
  if (minutes < 1) return '방금 업데이트';
  return `${minutes}분 전 업데이트`;
}
