"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} id="about" className="relative py-20 md:py-32 px-6 overflow-hidden bg-[#030303]">
      <div className="orb w-[250px] h-[250px] bg-primary/20 top-10 right-0 animate-float-medium" />
      <div className="orb w-[150px] h-[150px] bg-purple-500/10 bottom-10 left-0 animate-float-reverse" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div className="relative perspective" style={{ y: imgY }}>
            <motion.div
              className="relative rounded-3xl overflow-hidden animate-rotate-3d"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=80"
                alt="Training"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 right-4 md:right-8 glass rounded-2xl px-4 py-3 animate-float-slow"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xs text-primary font-bold">EST. 2014</p>
              <p className="text-[10px] text-gray-400">10+ Years</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-8 h-[2px] bg-primary" />
              <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">About Us</span>
            </motion.div>

            <motion.h2
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              WHERE CHAMPIONS <span className="text-primary">TRAIN</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-base md:text-lg leading-relaxed font-body font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Olympic Gym is your premier destination for achieving peak fitness. Our state-of-the-art facility offers cutting-edge equipment, expert trainers, and a welcoming community for all fitness levels.
            </motion.p>

            <motion.p
              className="text-gray-500 text-base md:text-lg leading-relaxed font-body font-light mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Whether your goal is weight loss, muscle gain, or overall health improvement — we provide personalized programs to help you succeed.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
