type TachometerProps = {
  className?: string;
};

// Gauge maps value 0..8 across a 240° sweep, 0 = up (north), clockwise positive.
const START = -120;
const SWEEP = 240;
const MAX = 8;

function polar(cx: number, cy: number, r: number, valueAngleDeg: number) {
  const rad = (valueAngleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
}

function angleFor(v: number) {
  return START + (v / MAX) * SWEEP;
}

export default function Tachometer({ className = "" }: TachometerProps) {
  const cx = 100;
  const cy = 100;

  const majors = Array.from({ length: MAX + 1 }, (_, i) => i);
  const minors = Array.from({ length: MAX * 5 + 1 }, (_, i) => i / 5).filter(
    (v) => !Number.isInteger(v),
  );

  // Redline arc 6.2 → 8
  const rlStart = polar(cx, cy, 90, angleFor(6.2));
  const rlEnd = polar(cx, cy, 90, angleFor(8));

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Tachometer"
    >
      <defs>
        <radialGradient id="dial" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#1b1b1f" />
          <stop offset="70%" stopColor="#0c0c0e" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>
        <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5a63" />
          <stop offset="100%" stopColor="#e20a17" />
        </linearGradient>
        <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dial face */}
      <circle cx={cx} cy={cy} r="96" fill="url(#dial)" stroke="#2a2a30" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="96" fill="none" stroke="#000" strokeOpacity="0.6" strokeWidth="3" />

      {/* Minor ticks */}
      {minors.map((v) => {
        const a = angleFor(v);
        const p1 = polar(cx, cy, 88, a);
        const p2 = polar(cx, cy, 81, a);
        const isRed = v >= 6.2;
        return (
          <line
            key={`min-${v}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={isRed ? "#ff2a36" : "#5a5f68"}
            strokeOpacity={isRed ? 0.7 : 0.45}
            strokeWidth="1"
          />
        );
      })}

      {/* Major ticks + numbers */}
      {majors.map((v) => {
        const a = angleFor(v);
        const p1 = polar(cx, cy, 90, a);
        const p2 = polar(cx, cy, 78, a);
        const np = polar(cx, cy, 64, a);
        const isRed = v >= 6;
        return (
          <g key={`maj-${v}`}>
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={isRed ? "#ff2a36" : "#c7cdd6"}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <text
              x={np.x}
              y={np.y}
              fill={isRed ? "#ff5a63" : "#aeb4bd"}
              fontSize="13"
              fontFamily="var(--font-display), Impact, sans-serif"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {v}
            </text>
          </g>
        );
      })}

      {/* Redline arc */}
      <path
        d={`M ${rlStart.x} ${rlStart.y} A 90 90 0 0 1 ${rlEnd.x} ${rlEnd.y}`}
        fill="none"
        stroke="#e20a17"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* RPM label */}
      <text
        x={cx}
        y="132"
        fill="#7e848d"
        fontSize="7.5"
        letterSpacing="2"
        fontFamily="var(--font-mono), monospace"
        textAnchor="middle"
      >
        RPM x1000
      </text>

      {/* Needle */}
      <g className="needle" filter="url(#needleGlow)">
        <polygon
          points="100,28 96.5,104 103.5,104"
          fill="url(#needleGrad)"
        />
        <circle cx={cx} cy={cy} r="9" fill="#17171a" stroke="#3a3a42" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="3.2" fill="#e20a17" />
      </g>
    </svg>
  );
}
