"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Phone, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  return (
    <section ref={containerRef} id="contact" className="relative overflow-hidden">
      {/* CTA Banner */}
      <div className="relative py-24 md:py-32 px-6 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            JOIN TODAY
          </motion.h2>
          <motion.a
            href="https://wa.me/917317343243?text=Hi%2C%20I%20want%20to%20join%20Olympic%20Gym"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-heading font-bold text-lg tracking-wider rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            GET STARTED
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={ref} className="relative bg-[#050505] py-20 md:py-28 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-[300px] h-[300px] bg-green-500/5 top-10 right-0 animate-float-slow" />
        <div className="orb w-[200px] h-[200px] bg-primary/5 bottom-10 left-0 animate-float-medium" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Reach Out</span>
            <h3 className="font-heading text-4xl md:text-5xl font-extrabold text-white mt-3">
              LET&apos;S <span className="text-primary">CONNECT</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone 1 */}
            <motion.a
              href="tel:+917317343243"
              className="card-3d relative p-6 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/5 hover:border-primary/30 transition-all group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">73 173 43 243</p>
                  <p className="text-gray-500 text-xs mt-0.5">Primary Contact</p>
                </div>
              </div>
              <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-gray-700 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>

            {/* Phone 2 */}
            <motion.a
              href="tel:+919079282918"
              className="card-3d relative p-6 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/5 hover:border-primary/30 transition-all group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">90 792 82 918</p>
                  <p className="text-gray-500 text-xs mt-0.5">Secondary Contact</p>
                </div>
              </div>
              <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-gray-700 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>

            {/* WhatsApp - GREEN themed */}
            <motion.a
              href="https://wa.me/917317343243"
              target="_blank"
              rel="noopener noreferrer"
              className="card-3d relative p-6 rounded-2xl bg-gradient-to-br from-green-950/50 to-[#080808] border border-green-500/20 hover:border-green-500/50 transition-all group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500 to-green-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/15 transition-all" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</p>
                  <p className="text-gray-500 text-xs mt-0.5">Message us anytime</p>
                </div>
              </div>
              <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-gray-700 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>

            {/* Location */}
            <motion.div
              className="card-3d relative p-6 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-blue-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-heading text-base md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Raisinghnagar</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">Near Doordarsahan Kendar, 100 Feet Road, 335051 Raj.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black py-6 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="" className="w-7 h-7 rounded-full" />
            <span className="font-heading text-sm font-bold">
              <span className="text-primary">O</span>lympic <span className="text-primary">G</span>ym
            </span>
          </div>
          <p className="text-gray-600 text-[10px] md:text-xs">© {new Date().getFullYear()} Olympic Gym, Raisinghnagar. Owner: Anil Verma</p>
        </div>
      </div>
    </section>
  );
}
