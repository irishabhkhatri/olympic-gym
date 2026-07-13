"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function Trainer() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden bg-[#020202]">
      <div className="orb w-[250px] h-[250px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-slow" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative mx-auto w-[280px] md:w-[350px] lg:w-full lg:max-w-[400px] perspective"
            initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div
              className="rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/10"
              style={{ scale: imgScale }}
            >
              <img
                src="/trainer.png"
                alt="Anil Verma"
                className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 rounded-[2rem]" />
            </motion.div>

            <motion.div
              className="absolute -bottom-5 left-4 right-4 glass rounded-2xl p-4 animate-float-slow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="font-heading text-lg font-extrabold text-white">ANIL VERMA</p>
              <p className="text-gray-400 text-xs font-body mt-1">Personal Trainer & Gym Owner</p>
              <div className="flex gap-2 mt-3">
                <div className="glass rounded-lg px-2 py-1">
                  <p className="text-[9px] text-primary font-bold">10+ YRS</p>
                </div>
                <div className="glass rounded-lg px-2 py-1">
                  <p className="text-[9px] text-primary font-bold">500+ CLIENTS</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text - visible on desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Trainer</span>
            <h2 className="font-heading text-5xl xl:text-6xl font-extrabold text-white mt-4 leading-tight">
              GET IN SHAPE<br />WITH <span className="text-primary">ANIL VERMA</span>
            </h2>
            <p className="text-gray-400 text-lg font-body font-light mt-6 leading-relaxed">
              Expert guidance, personalized workout plans, and nutrition advice to help you reach your goals faster.
            </p>
            <a
              href="https://wa.me/917317343243?text=Hi%2C%20I%20want%20to%20enquire%20about%20personal%20training"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white font-heading font-bold tracking-wider rounded-xl hover:brightness-110 transition-all"
            >
              BOOK PT SESSION
            </a>
          </motion.div>
        </div>

        {/* Mobile header */}
        <motion.div
          className="lg:hidden text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Know Your Trainer</span>
          <h2 className="font-heading text-3xl font-extrabold text-white mt-3">
            GET IN SHAPE WITH <span className="text-primary">ANIL</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
