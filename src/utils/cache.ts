interface CacheEnvelope<T> {
  v: T;
  ts: number;
}

/** sessionStorage 접근이 막혀있을 때(사파리 프라이빗 모드 등)의 in-memory 폴백 */
const memoryFallback = new Map<string, CacheEnvelope<unknown>>();

function readEnvelope<T>(key: string): CacheEnvelope<T> | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEnvelope<T>;
  } catch {
    return (memoryFallback.get(key) as CacheEnvelope<T> | undefined) ?? null;
  }
}

function writeEnvelope<T>(key: string, envelope: CacheEnvelope<T>): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    memoryFallback.set(key, envelope);
  }
}

/** TTL 내에 저장된 값이 있으면 반환, 없거나 만료됐으면 null */
export function getCached<T>(key: string, ttlMs: number): T | null {
  const envelope = readEnvelope<T>(key);
  if (!envelope) return null;
  if (Date.now() - envelope.ts > ttlMs) return null;
  return envelope.v;
}

export function setCached<T>(key: string, value: T): void {
  writeEnvelope(key, { v: value, ts: Date.now() });
}
