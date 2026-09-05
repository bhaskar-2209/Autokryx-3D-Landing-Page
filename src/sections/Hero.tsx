import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { companyInfo } from '@/data/content';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const HeroScene = lazy(() => import('@/three/HeroScene').then((m) => ({ default: m.HeroScene })));

export function Hero() {
  const { isMobile } = useDeviceDetection();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      {/* Radial gold glow */}
      <div className="absolute inset-0 radial-gold" />

      {/* 3D Canvas — absolute positioned on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 z-0">
        <Suspense fallback={<div className="w-full h-full" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-xs font-medium text-gold-700 tracking-wider uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-gold" />
              {companyInfo.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-ink-700 leading-[1.05] tracking-tight"
          >
            AUTOKRYX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl md:text-4xl font-medium text-gradient-gold mt-4 leading-tight"
          >
            {companyInfo.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-sm md:text-base uppercase tracking-ultra-wide text-ink-400 mt-6"
          >
            {companyInfo.pillars}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-base md:text-lg text-ink-500 mt-8 leading-relaxed max-w-lg"
          >
            {companyInfo.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-gold text-white text-sm font-medium shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#corporate"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-ink-700 border border-ink-200 hover:border-gold-400 hover:text-gold-600 shadow-premium transition-all duration-300 text-sm font-medium"
            >
              Corporate Profile
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 mt-12 text-xs text-ink-300"
          >
            <span>CIN: {companyInfo.cin}</span>
            <span className="hidden sm:inline">·</span>
            <span>{companyInfo.regulator}</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-ink-300 uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
