"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const supplements = [
  { image: "/supplements/whey-protein.png" },
  { image: "/supplements/creatine.png" },
  { image: "/supplements/whey-plus.png" },
  { image: "/supplements/mass-gainer.png" },
  { image: "/supplements/multivitamin.png" },
  { image: "/supplements/store.png" },
];

export default function Supplements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="supplements" className="relative py-20 md:py-32 px-6 overflow-hidden bg-black">
      <div className="orb w-[200px] h-[200px] bg-green-500/10 top-0 right-0 animate-float-reverse" />
      <div className="orb w-[150px] h-[150px] bg-primary/10 bottom-10 left-10 animate-float-slow" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="flex items-end justify-between mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Nutrition</span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mt-2">
              SUPPLEMENTS
            </h2>
          </div>
          <a
            href="https://wa.me/917317343243?text=Hi%2C%20supplements%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl px-3 py-2 md:px-5 md:py-3 text-primary text-xs md:text-sm font-medium flex items-center gap-1.5 hover:bg-primary/10 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </motion.div>

        {/* Image grid - smaller on desktop, cropped edges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {supplements.map((item, index) => (
            <motion.div
              key={index}
              className="card-3d relative rounded-2xl overflow-hidden border border-white/5 group"
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* Cropped container - hides edges and screenshot UI */}
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt="Supplement"
                  className="w-[110%] h-[120%] object-cover object-center -ml-[5%] -mt-[8%] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
