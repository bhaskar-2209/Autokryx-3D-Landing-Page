import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/SectionTitle';
import { aboutPillars, quote } from '@/data/content';

export function About() {
  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 radial-gold opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="The Company"
          title="We Build The Platforms India Runs On."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-lg md:text-xl text-ink-500 leading-relaxed">
            Autokryx Technologies is a consumer technology company headquartered in Delhi NCR.
            We identify where digital infrastructure is missing and build platforms that fill
            those gaps — at scale, with precision, and built for the long term.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {aboutPillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="absolute top-0 left-0 w-12 h-px bg-gradient-gold" />
              <div className="pt-8">
                <span className="font-display text-5xl font-bold text-gold-200 group-hover:text-gold-300 transition-colors duration-500">
                  {pillar.number}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink-700 mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-ink-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto text-center py-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-gold-400 to-transparent" />
          <p className="font-display text-2xl md:text-3xl font-medium text-ink-700 leading-relaxed italic">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="mt-6 text-sm text-ink-400 uppercase tracking-wider">
            {quote.author}
          </footer>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-gold-400 to-transparent" />
        </motion.blockquote>
      </div>
    </section>
  );
}
