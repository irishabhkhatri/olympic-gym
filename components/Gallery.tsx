"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
  "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=500&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80",
  "https://images.unsplash.com/photo-1567598508481-65985588e295?w=500&q=80",
  "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&q=80",
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const col1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} id="gallery" className="relative py-20 md:py-32 overflow-hidden bg-[#030303]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Community</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-white mt-3">
            OUR <span className="text-primary">WARRIORS</span>
          </h2>
        </motion.div>

        {/* Mobile: horizontal swipe */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6" style={{ scrollbarWidth: "none" }}>
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="card-3d flex-shrink-0 w-[240px] h-[320px] rounded-3xl overflow-hidden snap-center relative"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2">
                  <p className="text-white text-xs font-medium">Member #{i + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: 2-column parallax masonry */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 h-[600px] overflow-hidden">
          <motion.div className="flex flex-col gap-4" style={{ y: col1Y }}>
            {images.slice(0, 2).map((src, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={src} alt="" className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="flex flex-col gap-4 pt-10" style={{ y: col2Y }}>
            {images.slice(2, 4).map((src, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={src} alt="" className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="hidden lg:flex flex-col gap-4" style={{ y: col1Y }}>
            {images.slice(4, 6).map((src, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <img src={src} alt="" className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
