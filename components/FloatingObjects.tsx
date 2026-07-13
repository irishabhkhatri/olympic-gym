"use client";

function Dumbbell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none">
      <rect x="10" y="8" width="12" height="24" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="22" y="12" width="8" height="16" rx="2" fill="#222" stroke="#444" strokeWidth="1" />
      <rect x="30" y="16" width="60" height="8" rx="4" fill="#666" stroke="#888" strokeWidth="1" />
      <rect x="90" y="12" width="8" height="16" rx="2" fill="#222" stroke="#444" strokeWidth="1" />
      <rect x="98" y="8" width="12" height="24" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="5" y="10" width="7" height="20" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
      <rect x="108" y="10" width="7" height="20" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
    </svg>
  );
}

function Kettlebell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill="none">
      <path d="M20 15 Q30 5 40 15" stroke="#555" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="50" r="22" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
      <circle cx="30" cy="50" r="8" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
      <rect x="22" y="26" width="16" height="8" rx="4" fill="#333" stroke="#555" strokeWidth="1" />
    </svg>
  );
}

function WeightPlate({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="28" fill="#222" stroke="#444" strokeWidth="2" />
      <circle cx="30" cy="30" r="20" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="6" fill="#111" stroke="#555" strokeWidth="2" />
      <text x="30" y="48" textAnchor="middle" fill="#555" fontSize="8" fontWeight="bold">20KG</text>
    </svg>
  );
}

function ProteinShaker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className} fill="none">
      <rect x="8" y="20" width="24" height="55" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
      <rect x="10" y="35" width="20" height="25" rx="2" fill="#e63946" opacity="0.6" />
      <rect x="6" y="16" width="28" height="6" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="14" y="5" width="12" height="12" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
      <rect x="17" y="2" width="6" height="5" rx="2" fill="#333" />
    </svg>
  );
}

function Barbell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" className={className} fill="none">
      <rect x="17" y="5" width="6" height="110" rx="3" fill="#555" stroke="#777" strokeWidth="1" />
      <rect x="10" y="8" width="20" height="10" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="12" y="18" width="16" height="8" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
      <rect x="10" y="102" width="20" height="10" rx="3" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="12" y="94" width="16" height="8" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
    </svg>
  );
}

export default function FloatingObjects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Dumbbell - top right */}
      <div
        className="absolute top-[15%] right-[5%] md:right-[10%] w-24 md:w-36 animate-float-slow opacity-40 md:opacity-60"
        style={{ animationDelay: "0s", transform: "rotate(-20deg) perspective(500px) rotateY(15deg)" }}
      >
        <Dumbbell className="w-full drop-shadow-[0_0_15px_rgba(230,57,70,0.2)]" />
      </div>

      {/* Kettlebell - left middle */}
      <div
        className="absolute top-[40%] left-[3%] md:left-[8%] w-12 md:w-16 animate-float-medium opacity-30 md:opacity-50"
        style={{ animationDelay: "1s", transform: "rotate(10deg) perspective(500px) rotateX(10deg)" }}
      >
        <Kettlebell className="w-full drop-shadow-[0_0_10px_rgba(230,57,70,0.15)]" />
      </div>

      {/* Weight Plate - bottom right */}
      <div
        className="absolute bottom-[20%] right-[8%] md:right-[15%] w-14 md:w-20 animate-float-reverse opacity-30 md:opacity-50"
        style={{ animationDelay: "2s", transform: "perspective(500px) rotateX(30deg) rotateY(-10deg)" }}
      >
        <WeightPlate className="w-full drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
      </div>

      {/* Protein Shaker - top left */}
      <div
        className="absolute top-[20%] left-[10%] md:left-[15%] w-8 md:w-12 animate-float-medium opacity-30 md:opacity-50"
        style={{ animationDelay: "0.5s", transform: "rotate(15deg) perspective(500px) rotateY(-20deg)" }}
      >
        <ProteinShaker className="w-full drop-shadow-[0_0_10px_rgba(230,57,70,0.2)]" />
      </div>

      {/* Barbell - right side */}
      <div
        className="absolute top-[55%] right-[3%] md:right-[5%] w-8 md:w-10 animate-float-slow opacity-25 md:opacity-40"
        style={{ animationDelay: "1.5s", transform: "rotate(-5deg) perspective(500px) rotateY(25deg)" }}
      >
        <Barbell className="w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
      </div>

      {/* Small weight plate - bottom left */}
      <div
        className="absolute bottom-[30%] left-[5%] md:left-[12%] w-10 md:w-14 animate-float-slow opacity-20 md:opacity-40"
        style={{ animationDelay: "3s", transform: "perspective(500px) rotateX(-20deg) rotateZ(15deg)" }}
      >
        <WeightPlate className="w-full drop-shadow-[0_0_8px_rgba(230,57,70,0.1)]" />
      </div>

      {/* Extra dumbbell - bottom center-left (desktop only) */}
      <div
        className="hidden md:block absolute bottom-[15%] left-[30%] w-28 animate-float-medium opacity-30"
        style={{ animationDelay: "2.5s", transform: "rotate(30deg) perspective(500px) rotateX(15deg) rotateY(-10deg)" }}
      >
        <Dumbbell className="w-full drop-shadow-[0_0_12px_rgba(230,57,70,0.15)]" />
      </div>
    </div>
  );
}
