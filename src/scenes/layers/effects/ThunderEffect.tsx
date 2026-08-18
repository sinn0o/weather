/** 뇌우: 어두운 구름 + 주기적으로 번쩍이는 번개 플래시 */
export function ThunderEffect() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-slate-900/40" />
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="animate-drift absolute rounded-full bg-slate-700/70 blur-xl"
          style={{
            top: cloud.top,
            width: cloud.size,
            height: cloud.size * 0.4,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
      <div className="animate-flash absolute inset-0 bg-white" />
    </div>
  );
}

const CLOUDS = [
  { top: '10%', size: 200, duration: 50, delay: -10 },
  { top: '25%', size: 150, duration: 65, delay: -30 },
  { top: '2%', size: 120, duration: 40, delay: -5 },
];
