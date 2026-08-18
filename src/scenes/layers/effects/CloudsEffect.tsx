/** 구름많음/흐림: 흐릿한 구름 덩어리가 천천히 좌→우로 드리프트 */
export function CloudsEffect() {
  return (
    <div className="absolute inset-0">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="animate-drift absolute rounded-full bg-white/70 blur-xl"
          style={{
            top: cloud.top,
            width: cloud.size,
            height: cloud.size * 0.4,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const CLOUDS = [
  { top: '15%', size: 180, duration: 55, delay: -5 },
  { top: '30%', size: 130, duration: 75, delay: -25 },
  { top: '8%', size: 100, duration: 45, delay: -15 },
  { top: '45%', size: 150, duration: 85, delay: -40 },
];
