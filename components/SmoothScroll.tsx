"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (!progressRef.current) return;
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      progressRef.current.style.width = `${p * 100}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    setTimeout(() => setLoaded(true), 1200);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Loading */}
      <div className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-all duration-700 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <div className="text-center">
          <div className="relative">
            <img src="/logo.jpg" alt="Olympic Gym" className="w-20 h-20 rounded-full mx-auto" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse-ring" />
          </div>
          <p className="text-white/50 text-xs mt-6 tracking-[0.3em] uppercase font-body">Olympic Gym</p>
        </div>
      </div>

      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[9998]">
        <div ref={progressRef} className="h-full bg-primary" style={{ width: "0%" }} />
      </div>

      {children}
    </>
  );
}
