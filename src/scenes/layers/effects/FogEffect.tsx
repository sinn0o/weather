/** 안개: 화면을 가로지르는 흐릿한 수평 밴드가 느리게 드리프트 */
export function FogEffect() {
  return (
    <div className="absolute inset-0">
      {BANDS.map((band, i) => (
        <div
          key={i}
          className="animate-drift absolute left-0 right-0 bg-white/30 blur-2xl"
          style={{ top: band.top, height: band.height, animationDuration: `${band.duration}s` }}
        />
      ))}
    </div>
  );
}

const BANDS = [
  { top: '25%', height: '18%', duration: 65 },
  { top: '50%', height: '22%', duration: 85 },
  { top: '72%', height: '16%', duration: 55 },
];
