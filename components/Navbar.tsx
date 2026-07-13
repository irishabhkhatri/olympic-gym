"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#supplements", label: "Shop" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-xl py-3" : "bg-transparent py-5"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="" className="w-8 h-8 rounded-full" />
          <span className="font-heading text-lg font-extrabold">
            <span className="text-primary">O</span><span className="text-white">lympic </span>
            <span className="text-primary">G</span><span className="text-white">ym</span>
          </span>
        </a>

        <button onClick={() => setIsOpen(true)} className="text-white p-2 -mr-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-[100] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-heading text-lg font-extrabold">
                <span className="text-primary">O</span>lympic <span className="text-primary">G</span>ym
              </span>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-4xl font-extrabold text-white active:text-primary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/admin/login"
                className="mt-6 px-8 py-3 bg-primary text-white font-heading font-bold rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                ADMIN
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
