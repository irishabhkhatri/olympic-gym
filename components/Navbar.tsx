"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close panel only if user scrolled significantly (not from anchor link jump)
      if (isOpen && Math.abs(window.scrollY - lastScrollY) > 100) {
        setIsOpen(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#supplements", label: "Shop" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black py-3 border-b border-white/5" : "bg-transparent py-5"
      }`}
    >
      <div className="px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="" className="w-8 h-8 rounded-full" />
          <span className="font-heading text-lg font-extrabold">
            <span className="text-[#e63946]">O</span><span className="text-white">lympic </span>
            <span className="text-[#e63946]">G</span><span className="text-white">ym</span>
          </span>
        </a>

        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="relative text-white p-3 -mr-3">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              className="fixed inset-0 z-[99] backdrop-blur-lg bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col overflow-hidden backdrop-blur-2xl bg-black/70"
              initial={{ clipPath: "circle(0% at calc(100% - 40px) 30px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 40px) 30px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 40px) 30px)" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="font-heading text-lg font-extrabold">
                  <span className="text-[#e63946]">O</span>lympic <span className="text-[#e63946]">G</span>ym
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
                    className="font-heading text-4xl font-extrabold text-white active:text-[#e63946] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/admin/login"
                  className="mt-6 px-8 py-3 bg-[#e63946] text-white font-heading font-bold rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  ADMIN
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
