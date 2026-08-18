/** 비: 위에서 아래로 떨어지는 짧은 빗줄기 */
export function RainEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-70">
      {DROPS.map((drop, i) => (
        <span
          key={i}
          className="animate-fall absolute top-0 block w-px bg-white/60"
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const DROPS = Array.from({ length: 60 }, (_, i) => ({
  left: `${(i * 13) % 100}%`,
  height: 14 + (i % 5) * 4,
  duration: 0.6 + (i % 4) * 0.15,
  delay: (i % 10) * 0.1,
}));
