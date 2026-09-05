import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/SectionTitle';
import { visionMilestones } from '@/data/content';

export function Vision() {
  return (
    <section className="relative py-32 bg-ink-50/50 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Vision & Expansion"
          title="A Systematic National Build-Out."
          align="center"
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400 via-gold-200 to-transparent md:-translate-x-px" />

          {visionMilestones.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={milestone.numeral}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-gold border-4 border-white shadow-gold -translate-x-1/2 mt-2 z-10" />

                {/* Content */}
                <div className={`flex-1 pl-20 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="font-display text-3xl font-bold text-gold-200">
                    {milestone.numeral}
                  </span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-gold-600 mt-2 mb-2">
                    {milestone.period}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink-700 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-ink-400 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>

        {/* Origin point */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-gold">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-gold" />
            <span className="text-sm font-medium text-gold-700">Delhi NCR · Origin Point · India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
