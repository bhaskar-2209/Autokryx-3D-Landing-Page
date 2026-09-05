import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/SectionTitle';
import { partners } from '@/data/content';

export function Partners() {
  return (
    <section id="partners" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Partnerships"
          title="Backed by Global Technology Ecosystems"
          subtitle="Our participation across these ecosystems reflects a deliberate commitment to operating where the future is being built."
        />

        {/* Logo grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-20">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[3/2] rounded-xl border border-ink-100 bg-white flex items-center justify-center hover:border-gold-300 hover:shadow-gold transition-all duration-500"
            >
              <span className="font-display text-lg md:text-xl font-bold text-ink-300 group-hover:text-ink-700 transition-colors duration-500 tracking-wider">
                {partner.name}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-50/0 to-gold-50/0 group-hover:from-gold-50/30 group-hover:to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Partner descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.slice(0, 3).map((partner, i) => (
            <motion.div
              key={`desc-${partner.name}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-ink-100 bg-white shadow-premium hover:shadow-gold hover:border-gold-200 transition-all duration-500"
            >
              <h4 className="font-display text-lg font-semibold text-ink-700 mb-3">{partner.name}</h4>
              <p className="text-sm text-ink-400 leading-relaxed">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partnership philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="h-px w-16 bg-gradient-gold mx-auto mb-8" />
          <p className="font-display text-xl md:text-2xl font-medium text-ink-700 italic leading-relaxed">
            &ldquo;Every partnership we build is strategic and long-term — aligned with our
            mission to create the definitive consumer technology infrastructure for India.&rdquo;
          </p>
          <a
            href="mailto:partner@autokryx.in"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
          >
            Partner with Autokryx
          </a>
        </motion.div>
      </div>
    </section>
  );
}
