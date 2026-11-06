/**
 * Stylised Open Network globe. Pure SVG — no WebGL, no data fetch.
 * Decorative: the surrounding section carries the meaning.
 */
export function GlobeScene() {
  const pins = [
    { x: 148, y: 132 },
    { x: 236, y: 108 },
    { x: 264, y: 214 },
    { x: 170, y: 252 },
    { x: 206, y: 176 },
  ];

  return (
    <div className="globe-visual" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none">
        <defs>
          <radialGradient id="globe-body" cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#f3efff" />
            <stop offset="55%" stopColor="#ded3f7" />
            <stop offset="100%" stopColor="#b7a4e8" />
          </radialGradient>
          <linearGradient id="globe-arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#6d28d9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
          <filter id="globe-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* atmosphere */}
        <circle cx="200" cy="200" r="176" fill="#8b5cf6" opacity="0.12" filter="url(#globe-soft)" />
        <circle cx="200" cy="200" r="150" fill="url(#globe-body)" stroke="#c4b5fd" strokeWidth="1" />

        {/* rotating graticule */}
        <g className="globe-spin" opacity="0.5" stroke="#7c6b9c" strokeWidth="0.8">
          <ellipse cx="200" cy="200" rx="48" ry="150" />
          <ellipse cx="200" cy="200" rx="96" ry="150" />
          <ellipse cx="200" cy="200" rx="140" ry="150" />
          <ellipse cx="200" cy="200" rx="150" ry="48" />
          <ellipse cx="200" cy="200" rx="150" ry="96" />
          <line x1="200" y1="50" x2="200" y2="350" />
        </g>

        {/* connection arcs */}
        <path d="M148 132 Q 200 96 236 108" stroke="url(#globe-arc)" strokeWidth="2" />
        <path d="M236 108 Q 274 150 264 214" stroke="url(#globe-arc)" strokeWidth="2" />
        <path d="M264 214 Q 220 262 170 252" stroke="url(#globe-arc)" strokeWidth="2" />
        <path d="M170 252 Q 132 194 148 132" stroke="url(#globe-arc)" strokeWidth="2" />
        <path d="M148 132 Q 184 160 206 176 Q 236 186 236 108" stroke="url(#globe-arc)" strokeWidth="1.2" />

        {/* ripple pins */}
        {pins.map((p, i) => (
          <g key={`${p.x}-${p.y}`} className="globe-pin" style={{ animationDelay: `${i * 0.7}s` }}>
            <circle cx={p.x} cy={p.y} r="9" fill="#8b5cf6" opacity="0.18" />
            <circle cx={p.x} cy={p.y} r="4" fill="#6d28d9" />
            <circle cx={p.x} cy={p.y} r="1.6" fill="#ffffff" />
          </g>
        ))}
      </svg>
    </div>
  );
}
