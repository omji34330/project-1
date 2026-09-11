export default function EnergyIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="w-full max-w-md mx-auto drop-shadow-[0_20px_60px_rgba(23,189,126,0.25)]"
      role="img"
      aria-label="Illustration of a solar panel and wind turbine feeding energy into a battery"
    >
      {/* Sky glow */}
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#17bd7e" />
          <stop offset="100%" stopColor="#0c7a54" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="370" cy="78" r="46" fill="url(#sunGlow)" className="animate-pulse-soft" />
      <circle cx="370" cy="78" r="22" fill="#fbbf24" />

      {/* Ground */}
      <path d="M0 360 Q240 330 480 360 V420 H0 Z" fill="currentColor" className="text-emerald-600/10 dark:text-emerald-400/10" />

      {/* Wind turbine */}
      <g>
        <rect x="106" y="150" width="6" height="200" rx="3" fill="currentColor" className="text-night-700 dark:text-emerald-100/70" />
        <g style={{ transformOrigin: '109px 150px' }} className="animate-spin-slow">
          <rect x="106" y="60" width="6" height="92" rx="3" fill="#22c3b0" />
          <rect x="106" y="150" width="6" height="92" rx="3" fill="#22c3b0" transform="rotate(120 109 150)" />
          <rect x="106" y="150" width="6" height="92" rx="3" fill="#22c3b0" transform="rotate(240 109 150)" />
        </g>
        <circle cx="109" cy="150" r="7" fill="#0e9e94" />
      </g>

      {/* Solar panel array */}
      <g transform="translate(190,260)">
        <rect x="0" y="0" width="150" height="80" rx="6" fill="url(#panelGrad)" transform="skewX(-8)" />
        {[0, 1, 2].map((row) => (
          <g key={row}>
            {[0, 1, 2, 3].map((col) => (
              <rect
                key={col}
                x={8 + col * 36}
                y={8 + row * 24}
                width="30"
                height="18"
                rx="2"
                fill="#0a4e3a"
                opacity="0.5"
                transform="skewX(-8)"
              />
            ))}
          </g>
        ))}
        <rect x="10" y="80" width="12" height="26" fill="currentColor" className="text-night-700 dark:text-emerald-100/70" />
      </g>

      {/* Battery */}
      <g transform="translate(380,270)">
        <rect x="0" y="10" width="60" height="90" rx="8" fill="none" stroke="#17bd7e" strokeWidth="3" />
        <rect x="18" y="0" width="24" height="12" rx="3" fill="#17bd7e" />
        <rect x="6" y="60" width="48" height="30" rx="3" fill="#17bd7e" opacity="0.85" />
        <rect x="6" y="35" width="48" height="20" rx="3" fill="#17bd7e" opacity="0.45" />
      </g>

      {/* Flowing power lines */}
      <path
        d="M112 250 C150 230, 170 240, 190 300"
        fill="none"
        stroke="#22c3b0"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        className="animate-flow-dash"
      />
      <path
        d="M300 300 C340 300, 360 300, 382 320"
        fill="none"
        stroke="#17bd7e"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        className="animate-flow-dash"
      />
    </svg>
  );
}
