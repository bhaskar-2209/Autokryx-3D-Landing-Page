import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { companyInfo } from '@/data/content';

export function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-white overflow-hidden">
      {/* Subtle golden glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-gold-50/60 via-gold-50/20 to-transparent blur-3xl" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-medium uppercase tracking-ultra-wide text-gold-600 mb-6"
        >
          Let&rsquo;s Build The Future
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl font-medium text-ink-700 leading-tight mb-8"
        >
          Let&rsquo;s Build The Future.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg text-ink-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Autokryx engages with technology companies, research organizations, universities,
          ecosystem leaders, and institutional partners who share a long-term view of innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href={`mailto:${companyInfo.email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-white text-sm font-medium shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${companyInfo.partnerEmail}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-ink-700 border border-ink-200 hover:border-gold-400 hover:text-gold-600 shadow-premium transition-all duration-300 text-sm font-medium"
          >
            Partner Enquiry
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col md:flex-row gap-8 justify-center items-center"
        >
          <a
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-3 text-sm text-ink-500 hover:text-gold-600 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-gold-600" />
            </div>
            {companyInfo.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-ink-500">
            <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200/50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold-600" />
            </div>
            {companyInfo.location}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
