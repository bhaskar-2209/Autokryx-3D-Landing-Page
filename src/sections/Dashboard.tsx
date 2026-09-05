import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Network,
  Wallet,
  Activity,
  TrendingUp,
  Circle,
  ArrowUpRight,
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, AdaptiveDpr } from '@react-three/drei';
import { DashboardScene } from '@/three/DashboardScene';
import { products, marketStats, visionMilestones, companyInfo } from '@/data/content';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

const statusConfig: Record<string, { color: string; dot: string; pct: number }> = {
  Active: { color: 'text-green-600', dot: 'bg-green-500', pct: 100 },
  'In Development': { color: 'text-blue-600', dot: 'bg-blue-500', pct: 55 },
  Planned: { color: 'text-amber-600', dot: 'bg-amber-500', pct: 25 },
  Roadmap: { color: 'text-purple-600', dot: 'bg-purple-500', pct: 10 },
};

const productIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ShieldCheck,
  Network,
  Wallet,
};

export function Dashboard() {
  const { isMobile, isLowPerf } = useDeviceDetection();
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <section id="dashboard" className="relative py-32 bg-ink-50/40 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
            Ecosystem Dashboard
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink-700 leading-tight mt-4 max-w-3xl">
            The Autokryx Product Ecosystem
          </h2>
          <div className="h-px w-16 bg-gradient-gold mt-6" />
        </motion.div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Visualization — spans 2 columns on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 relative rounded-2xl border border-ink-100 bg-white shadow-premium overflow-hidden"
            style={{ minHeight: isMobile ? '340px' : '480px' }}
          >
            {/* Canvas background */}
            <div className="absolute inset-0">
              <Canvas
                dpr={dpr}
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
              >
                <AdaptiveDpr pixelated={false} />
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} color="#FFFFFF" />
                  <pointLight position={[-3, 3, -3]} intensity={0.4} color="#D4AF37" />
                  <DashboardScene reducedParticles={isMobile || isLowPerf} />
                  <Environment preset="studio" />
                </Suspense>
              </Canvas>
            </div>

            {/* Overlay header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gold-500" />
                <span className="text-xs font-medium uppercase tracking-wider text-ink-400">
                  Product Network · Live View
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-ink-400">Ecosystem Active</span>
              </div>
            </div>

            {/* Overlay legend */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap gap-4 z-10 pointer-events-none">
              {products.map((p) => {
                const cfg = statusConfig[p.status] || statusConfig['Roadmap'];
                return (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className="text-xs font-medium text-ink-500">{p.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 radial-gold opacity-40 pointer-events-none" />
          </motion.div>

          {/* Right column — stats */}
          <div className="flex flex-col gap-6">
            {marketStats.slice(0, 3).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-ink-100 bg-white shadow-premium hover:shadow-gold hover:border-gold-200 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="w-5 h-5 text-gold-500" />
                  <span className="text-xs text-ink-300 font-mono">0{i + 1}</span>
                </div>
                <p className="font-display text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-xs text-ink-400 mt-2 leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product status row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product, i) => {
            const Icon = productIcons[product.icon] || Users;
            const cfg = statusConfig[product.status] || statusConfig['Roadmap'];
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-ink-100 bg-white shadow-premium hover:shadow-gold hover:border-gold-200 transition-all duration-500 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className={`w-2 h-2 fill-current ${cfg.color}`} />
                    <span className={`text-xs font-medium ${cfg.color}`}>{product.status}</span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-700 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-ink-300 mb-4">{product.category}</p>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-ink-50 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-gold rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cfg.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-xs text-ink-300 mt-2 block">{cfg.pct}% maturity</span>
              </motion.div>
            );
          })}
        </div>

        {/* Roadmap progress strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mt-6 p-8 rounded-2xl border border-ink-100 bg-white shadow-premium"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-medium uppercase tracking-wider text-gold-600">
              Expansion Roadmap
            </span>
            <span className="text-xs text-ink-300">· {companyInfo.location}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {visionMilestones.map((milestone, i) => (
              <div key={milestone.numeral} className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-2xl font-bold text-gold-200">
                    {milestone.numeral}
                  </span>
                  <span className="text-xs text-ink-300">{milestone.period}</span>
                </div>
                <p className="text-xs font-medium text-ink-600 leading-snug">
                  {milestone.title}
                </p>
                {/* Connector line */}
                {i < visionMilestones.length - 1 && (
                  <div className="hidden md:block absolute top-3 -right-2 w-4 h-px bg-ink-100" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
