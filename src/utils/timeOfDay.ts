import type { TimeOfDay } from '../types/weather';

/** 주어진 IANA 타임존의 현재(또는 지정 시각) 시/분을 반환한다. */
export function getLocalHourMinute(
  timezone: string,
  at: Date = new Date(),
): { hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(at);

  const hourPart = parts.find((p) => p.type === 'hour')?.value ?? '0';
  const minutePart = parts.find((p) => p.type === 'minute')?.value ?? '0';

  // Intl은 자정을 '24'로 표기하기도 하므로 24 -> 0으로 보정
  const hour = Number(hourPart) % 24;
  const minute = Number(minutePart);

  return { hour, minute };
}

/** HH:MM 형식의 현지 시각 라벨 */
export function getLocalTimeLabel(timezone: string, at: Date = new Date()): string {
  const { hour, minute } = getLocalHourMinute(timezone, at);
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

/**
 * 현지 시각 기준 낮/노을/밤 판정 (단순 고정 구간 규칙).
 * - 노을: 06:00~08:00, 17:00~19:00
 * - 낮: 08:00~17:00
 * - 밤: 그 외
 */
export function getTimeOfDay(timezone: string, at: Date = new Date()): TimeOfDay {
  const { hour } = getLocalHourMinute(timezone, at);

  if ((hour >= 6 && hour < 8) || (hour >= 17 && hour < 19)) return 'sunset';
  if (hour >= 8 && hour < 17) return 'day';
  return 'night';
}
