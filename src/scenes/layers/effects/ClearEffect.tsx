import type { EffectProps } from './types';

/** 맑음: 낮엔 해, 노을엔 노을빛 글로우, 밤엔 반짝이는 별 */
export function ClearEffect({ timeOfDay }: EffectProps) {
  if (timeOfDay === 'night') {
    return (
      <div className="absolute inset-0">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="animate-twinkle absolute h-1 w-1 rounded-full bg-white"
            style={{ top: star.top, left: star.left, animationDelay: `${star.delay}s` }}
          />
        ))}
      </div>
    );
  }

  const isSunset = timeOfDay === 'sunset';
  return (
    <div
      className={`absolute h-32 w-32 rounded-full blur-2xl sm:h-44 sm:w-44 ${
        isSunset ? 'bg-orange-300/50' : 'bg-yellow-100/60'
      }`}
      style={isSunset ? { top: '52%', right: '12%' } : { top: '10%', right: '15%' }}
    />
  );
}

const STARS = Array.from({ length: 45 }, (_, i) => ({
  top: `${(i * 37) % 85}%`,
  left: `${(i * 53) % 100}%`,
  delay: (i % 6) * 0.5,
}));
