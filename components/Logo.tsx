"use client";

export default function Logo({ size = 200 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]"
    >
      {/* Outer circle */}
      <circle cx="200" cy="200" r="190" fill="#0a0a0a" stroke="#ef4444" strokeWidth="3" />
      <circle cx="200" cy="200" r="180" fill="#000000" stroke="#333" strokeWidth="1" />

      {/* Inner decorative ring */}
      <circle cx="200" cy="200" r="165" fill="none" stroke="#ef4444" strokeWidth="0.5" opacity="0.5" />

      {/* Large "A" letter */}
      <text
        x="120"
        y="260"
        fontFamily="Cinzel Decorative, serif"
        fontSize="180"
        fontWeight="900"
        fill="white"
        opacity="0.95"
      >
        A
      </text>

      {/* Red swoosh/curve under the A */}
      <path
        d="M 100 270 Q 200 310 300 260"
        stroke="#ef4444"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Muscular figure silhouette (simplified bodybuilder double bicep pose) */}
      <g transform="translate(200, 140) scale(0.7)" fill="white" opacity="0.9">
        {/* Head */}
        <ellipse cx="0" cy="-45" rx="12" ry="14" />
        {/* Neck */}
        <rect x="-5" y="-32" width="10" height="10" />
        {/* Torso */}
        <path d="M -20 -22 L -25 30 L -8 35 L 0 20 L 8 35 L 25 30 L 20 -22 Z" />
        {/* Left arm (flexed) */}
        <path d="M -20 -20 L -45 -25 L -55 -55 L -48 -58 L -38 -30 L -20 -15 Z" />
        {/* Left bicep */}
        <ellipse cx="-50" cy="-45" rx="10" ry="14" />
        {/* Right arm (flexed) */}
        <path d="M 20 -20 L 45 -25 L 55 -55 L 48 -58 L 38 -30 L 20 -15 Z" />
        {/* Right bicep */}
        <ellipse cx="50" cy="-45" rx="10" ry="14" />
        {/* Waist/shorts */}
        <path d="M -15 30 L -18 55 L -5 55 L 0 40 L 5 55 L 18 55 L 15 30 Z" />
      </g>

      {/* "Olympic Gym" text in cursive */}
      <text
        x="200"
        y="340"
        fontFamily="Dancing Script, cursive"
        fontSize="42"
        fontWeight="700"
        fill="#ef4444"
        textAnchor="middle"
      >
        Olympic Gym
      </text>

      {/* Subtle outer glow ring */}
      <circle cx="200" cy="200" r="195" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
