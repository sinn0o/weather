import type { Landmark } from '../types/landmark';

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

/** 큐레이션된 랜드마크 목록 내에서만 도시/랜드마크/국가명(한글·영문)으로 검색 */
export function searchLandmarks(landmarks: Landmark[], query: string): Landmark[] {
  const q = normalize(query);
  if (!q) return landmarks;

  return landmarks.filter((l) =>
    [
      l.cityNameKo,
      l.cityNameEn,
      l.countryKo,
      l.countryEn,
      l.landmarkNameKo,
      l.landmarkNameEn,
    ].some((field) => normalize(field).includes(q)),
  );
}
