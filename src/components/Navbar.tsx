import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, companyInfo } from '@/data/content';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-premium py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="text-white font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display text-lg font-semibold text-ink-700 group-hover:text-gold-600 transition-colors">
              Autokryx
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-ink-500 hover:text-gold-600 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-gold group-hover:w-8 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-gold text-white text-sm font-medium shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
          </div>

          <button
            className="md:hidden p-2 text-ink-700"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
              <span className="font-display text-lg font-semibold text-ink-700">Autokryx</span>
              <button
                className="p-2 text-ink-700"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-4 text-lg font-medium text-ink-600 hover:text-gold-600 border-b border-ink-50 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={`mailto:${companyInfo.email}`}
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-gold text-white text-sm font-medium shadow-gold"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
