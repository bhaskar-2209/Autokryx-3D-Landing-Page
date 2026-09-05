import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/SectionTitle';
import { technologyPillars, marketStats } from '@/data/content';

export function Technology() {
  return (
    <section id="technology" className="relative py-32 bg-ink-50/50 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      {/* Animated network background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="network" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#D4AF37" />
              <line x1="50" y1="50" x2="0" y2="0" stroke="#D4AF37" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#D4AF37" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#D4AF37" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="#D4AF37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Technology"
          title="Built Different. By Design."
          subtitle="Every platform in the Autokryx ecosystem is built on a shared technological foundation — designed for trust, scale, and compounding network effects."
        />

        {/* Four technology pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {technologyPillars.map((pillar, i) => (
            <motion.div
              key={pillar.numeral}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-2xl border border-ink-100 bg-white shadow-premium hover:shadow-gold hover:border-gold-200 transition-all duration-500 group"
            >
              <span className="font-display text-3xl font-bold text-gold-300 group-hover:text-gold-400 transition-colors duration-500">
                {pillar.numeral}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-700 mt-4 mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-ink-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Market opportunity stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
              The Opportunity
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-medium text-ink-700 mt-4">
              Serving India&rsquo;s Next Billion.
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white border border-ink-100 shadow-premium hover:shadow-gold hover:border-gold-200 transition-all duration-500"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-ink-400 mt-3 leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
