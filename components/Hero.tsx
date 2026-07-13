"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

function AnimatedCounter({ target, suffix = "+", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const ref = useRef(null);
  const [logoFlying, setLogoFlying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - no scale to keep image sharp */}
      <div className="absolute inset-0">
        <img src="/hero-bg.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Floating gradient orbs */}
      <div className="orb w-[300px] h-[300px] bg-primary/40 -top-20 -right-20 animate-float-slow" />
      <div className="orb w-[200px] h-[200px] bg-blue-500/20 bottom-20 -left-20 animate-float-medium" />


      {/* Content */}
      <motion.div className="relative z-10 w-full px-6 pt-28 pb-16" style={{ opacity, y }}>
        {/* Logo with fly animation on click */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative inline-block">
            <motion.img
              src="/logo.jpg"
              alt="Olympic Gym"
              className="w-20 h-20 rounded-full animate-glow cursor-pointer"
              onClick={() => { setLogoFlying(true); setTimeout(() => setLogoFlying(false), 2000); }}
              animate={logoFlying ? {
                scale: [1, 1.5, 0.3, 1],
                rotate: [0, 180, 720, 1080],
                y: [0, -200, -100, 0],
                x: [0, 80, -40, 0],
                filter: ["brightness(1)", "brightness(2)", "brightness(3)", "brightness(1)"],
              } : {}}
              transition={logoFlying ? { duration: 1.8, ease: [0.16, 1, 0.3, 1] } : {}}
              whileTap={{ scale: 0.9 }}
            />
            <div className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-primary/30" />
            <AnimatePresence>
              {logoFlying && (
                <>
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(i * 36 * Math.PI / 180) * 120,
                        y: Math.sin(i * 36 * Math.PI / 180) * 120,
                        scale: 0,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.03 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Brand */}
        <motion.p
          className="font-heading text-xl font-extrabold tracking-wide mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <span className="text-primary">O</span><span className="text-white">lympic </span>
          <span className="text-primary">G</span><span className="text-white">ym</span>
        </motion.p>

        {/* Heading */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-[3.2rem] leading-[0.9] font-extrabold"
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.7 }}
          >
            <span className="text-white">TRAIN</span>
            <span className="text-primary"> HARD.</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading text-[3.2rem] leading-[0.9] font-extrabold"
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
          >
            <span className="text-white">STAY</span>
            <span className="text-primary"> STRONG.</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-base mt-6 max-w-xs font-body font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          Your premier destination for peak fitness. Raisinghnagar.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="https://wa.me/917317343243?text=Hi%2C%20I%20want%20to%20join%20Olympic%20Gym"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-primary text-white font-heading font-bold tracking-wider rounded-2xl animate-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          whileTap={{ scale: 0.95 }}
        >
          JOIN NOW
          <ArrowRight className="w-5 h-5" />
        </motion.a>

        {/* Stats - floating glass cards with animated counters */}
        <motion.div
          className="flex gap-3 mt-12 overflow-x-auto pb-2 -mx-2 px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <div className="glass rounded-2xl px-5 py-4 min-w-[100px] text-center card-3d animate-float-slow" style={{ animationDelay: "0s" }}>
            <p className="text-xl font-bold text-white font-heading"><AnimatedCounter target={500} /></p>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">Members</p>
          </div>
          <div className="glass rounded-2xl px-5 py-4 min-w-[100px] text-center card-3d animate-float-slow" style={{ animationDelay: "0.5s" }}>
            <p className="text-xl font-bold text-white font-heading"><AnimatedCounter target={15} /></p>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">Years</p>
          </div>
          <div className="glass rounded-2xl px-5 py-4 min-w-[100px] text-center card-3d animate-float-slow" style={{ animationDelay: "1s" }}>
            <p className="text-xl font-bold text-white font-heading">24/7</p>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">Support</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
