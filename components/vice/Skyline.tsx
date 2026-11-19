// Силуэт Батуми на линии горизонта: колесо обозрения, высотки, Башня алфавита
const TOWERS: { x: number; w: number; h: number }[] = [
  { x: 60, w: 58, h: 72 },
  { x: 130, w: 44, h: 96 },
  { x: 390, w: 54, h: 104 },
  { x: 452, w: 38, h: 150 },
  { x: 498, w: 70, h: 78 },
  { x: 576, w: 44, h: 170 },
  { x: 628, w: 60, h: 120 },
  { x: 696, w: 36, h: 196 },
  { x: 740, w: 78, h: 92 },
  { x: 826, w: 46, h: 146 },
  { x: 1050, w: 56, h: 112 },
  { x: 1114, w: 40, h: 78 },
];

const SPOKES = Array.from({ length: 12 }, (_, i) => (i * 180) / 12);

export default function Skyline({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1200 230"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g fill="#0a0215" stroke="rgba(255,46,136,0.55)" strokeWidth="1.5">
        {/* Колесо обозрения */}
        <g>
          <circle cx="300" cy="118" r="64" fill="#0a0215" />
          {SPOKES.map((a) => (
            <line
              key={a}
              x1="300"
              y1="118"
              x2={300 + 64 * Math.cos((a * Math.PI) / 180)}
              y2={118 + 64 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(0,229,255,0.5)"
            />
          ))}
          {SPOKES.map((a) => (
            <line
              key={`b${a}`}
              x1="300"
              y1="118"
              x2={300 - 64 * Math.cos((a * Math.PI) / 180)}
              y2={118 - 64 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(0,229,255,0.5)"
            />
          ))}
          <path d="M274 166 L256 230 M326 166 L344 230" stroke="rgba(255,46,136,0.6)" />
        </g>

        {/* Высотки */}
        {TOWERS.map((t) => (
          <rect key={t.x} x={t.x} y={230 - t.h} width={t.w} height={t.h} />
        ))}

        {/* Башня алфавита: шар на тонкой башне */}
        <rect x="900" y="52" width="26" height="178" />
        <circle cx="913" cy="44" r="22" />
        <line x1="913" y1="22" x2="913" y2="2" stroke="rgba(0,229,255,0.7)" />

        {/* Маяк и причал */}
        <path d="M966 230 L972 150 L992 150 L998 230 Z" />
        <rect x="968" y="132" width="28" height="18" />
        <rect x="1006" y="196" width="34" height="34" />
      </g>

      {/* Светящиеся окна */}
      <g fill="rgba(0,229,255,0.55)">
        {TOWERS.flatMap((t) =>
          Array.from({ length: Math.floor(t.h / 26) }, (_, r) => (
            <rect key={`${t.x}-${r}`} x={t.x + 8} y={230 - t.h + 14 + r * 24} width={t.w - 16} height={5} />
          ))
        )}
      </g>
    </svg>
  );
}
