export type Continent =
  | 'asia'
  | 'europe'
  | 'north-america'
  | 'south-america'
  | 'africa'
  | 'oceania';

export interface Landmark {
  /** 고유 id, kebab-case (예: 'paris-eiffel') */
  id: string;
  cityNameKo: string;
  cityNameEn: string;
  countryKo: string;
  countryEn: string;
  continent: Continent;
  landmarkNameKo: string;
  landmarkNameEn: string;
  lat: number;
  lon: number;
  /** IANA 타임존 (예: 'Europe/Paris') */
  timezone: string;
  /** 실루엣 SVG 레지스트리 키. 보통 id와 동일. */
  illustrationSet: string;
}
