# 🌍 세계 랜드마크 날씨

전 세계 주요 랜드마크를 카드로 탐색하고, 클릭하면 해당 도시의 실시간 날씨·현지 시간에 맞춰
배경 일러스트(하늘/날씨 효과/랜드마크 실루엣)가 바뀌는 풀스크린 씬으로 전환되는 사이트입니다.
자세한 기획은 [PRD.md](./PRD.md) 참고.

## 스택

- Vite + React + TypeScript (SPA, 서버/DB 없음)
- Tailwind CSS v4
- Framer Motion (레이어 크로스페이드/씬 전환)
- [Open-Meteo](https://open-meteo.com) Forecast API (무료, 키 불필요) — 24개 도시를 단일 배치 요청으로 조회

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드 (dist/)
npm run lint     # oxlint
```

## 구조

```
src/
  data/landmarks.ts          큐레이션된 24개 랜드마크 (대륙별 4개)
  api/openMeteo.ts            Open-Meteo 배치/단일 조회 + 정규화
  hooks/useWeatherBatch.ts    리스트 전체 날씨 조회, 부분/전체 실패 구분
  hooks/useWeatherForLandmark.ts  씬 진입 시 조회 (배치 캐시 재사용)
  utils/weatherCode.ts        WMO 코드 → 날씨 카테고리 매핑
  utils/timeOfDay.ts          타임존 기준 낮/노을/밤 판정
  components/                 검색·필터·카드 그리드 등 리스트 UI
  scenes/                     풀스크린 씬 (SkyLayer + WeatherEffectLayer + SilhouetteLayer)
  scenes/layers/silhouettes/  도시별 SVG 실루엣. registry.ts에 등록하지 않으면
                               GenericSilhouette로 자동 대체된다 — 새 도시 추가 시
                               이 폴더에 컴포넌트를 만들고 registry에 한 줄만 추가하면 됨.
```

## 참고

- 랜드마크 일러스트는 디자인 에셋이 아니라 코드로 직접 그린 절차적 SVG/CSS 씬(하늘 그라디언트 +
  날씨 파티클 효과 + 도시별 실루엣 레이어 합성)입니다.
- 24개 도시 중 실루엣 SVG는 대륙당 1개(총 8개: 에펠탑/도쿄타워/자유의 여신상/시드니 오페라
  하우스/기자의 피라미드/거대한 예수상/빅벤/타지마할)를 우선 제작했고, 나머지는 GenericSilhouette로
  동작합니다. 필요 시 점진적으로 추가할 수 있습니다.
