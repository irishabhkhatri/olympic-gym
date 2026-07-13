"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dumbbell, HeartPulse, User, ClipboardList, Apple, DoorOpen, Scale, Waves, Award } from "lucide-react";

const services = [
  { name: "Weightlifting", icon: Dumbbell, color: "from-red-500/20 to-transparent" },
  { name: "Cardio Training", icon: HeartPulse, color: "from-orange-500/20 to-transparent" },
  { name: "Personal Trainer", icon: User, color: "from-green-500/20 to-transparent" },
  { name: "Training Report", icon: ClipboardList, color: "from-blue-500/20 to-transparent" },
  { name: "Diet Nutrition", icon: Apple, color: "from-yellow-500/20 to-transparent" },
  { name: "Locker Room", icon: DoorOpen, color: "from-purple-500/20 to-transparent" },
  { name: "Weight Control", icon: Scale, color: "from-pink-500/20 to-transparent" },
  { name: "Yoga", icon: Waves, color: "from-cyan-500/20 to-transparent" },
  { name: "Achievement", icon: Award, color: "from-amber-500/20 to-transparent" },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="relative py-20 md:py-32 px-6 overflow-hidden bg-black">
      <div className="orb w-[200px] h-[200px] bg-primary/15 top-20 -left-10 animate-float-slow" />
      <div className="orb w-[150px] h-[150px] bg-blue-500/10 bottom-20 right-0 animate-float-medium" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-xs font-body tracking-[0.3em] uppercase">Our Programs</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold text-white mt-3">
            START <span className="text-primary">TODAY</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-4 max-w-md mx-auto font-body">
            Build your body to be healthier. Be consistent with exercising and eating healthy.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 max-w-3xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`card-3d relative rounded-2xl md:rounded-3xl p-4 md:p-6 text-center bg-gradient-to-br ${service.color} border border-white/5 backdrop-blur-sm`}
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.92, rotateX: 5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
              <p className="text-white text-[10px] md:text-sm font-medium leading-tight">{service.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
