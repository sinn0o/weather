/** 눈: 크기가 다른 점들이 천천히 떨어짐 */
export function SnowEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="animate-fall absolute top-0 block rounded-full bg-white/80"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const FLAKES = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 17) % 100}%`,
  size: 3 + (i % 4),
  duration: 6 + (i % 5) * 2,
  delay: (i % 8) * 0.7,
  opacity: 0.5 + (i % 3) * 0.15,
}));
