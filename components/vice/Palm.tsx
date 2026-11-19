// Силуэт пальмы для неонового фона
export default function Palm({
  className,
  flip = false,
  style,
}: {
  className?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  const fronds = [-96, -62, -28, 0, 28, 62, 96];

  return (
    <svg
      viewBox="0 0 200 420"
      className={`vice-palm ${className ?? ""}`}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
      fill="currentColor"
    >
      {/* ствол */}
      <path d="M92 420 C 92 320 86 230 76 162 L 104 158 C 112 230 116 330 118 420 Z" />
      {/* листья */}
      <g transform="translate(92 158)">
        {fronds.map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 0 C -22 -22 -56 -34 -94 -24 C -62 -48 -24 -44 -2 -12 Z"
          />
        ))}
      </g>
      {/* кокосы */}
      <circle cx="80" cy="166" r="9" />
      <circle cx="100" cy="172" r="8" />
    </svg>
  );
}
