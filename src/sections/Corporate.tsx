import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/SectionTitle';
import { companyInfo } from '@/data/content';

const corporateDetails = [
  { label: 'Legal Structure', value: companyInfo.legalStructure },
  { label: 'Governing Law', value: companyInfo.governingLaw },
  { label: 'CIN', value: companyInfo.cin },
  { label: 'Regulator', value: companyInfo.regulator },
  { label: 'Industry Code', value: companyInfo.industryCode },
  { label: 'Year of Incorporation', value: companyInfo.yearOfIncorporation },
  { label: 'Compliance Status', value: companyInfo.complianceStatus },
];

export function Corporate() {
  return (
    <section id="corporate" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Corporate"
          title="Incorporated, Compliant, Built To Endure."
          subtitle="Autokryx Technologies Private Limited is a purpose-built corporate entity. From day one, we have operated with full regulatory compliance, structured governance, and a long-term mandate."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Corporate details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1"
          >
            {corporateDetails.map((detail, i) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-ink-50 group"
              >
                <span className="text-sm text-ink-400 mb-1 md:mb-0">{detail.label}</span>
                <span className="text-sm font-medium text-ink-700 md:text-right group-hover:text-gold-600 transition-colors duration-300">
                  {detail.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Compliance badge / visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative p-10 rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-ink-50/50 shadow-premium overflow-hidden">
              {/* Gold seal */}
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-br from-gold-100/40 to-transparent" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold mb-6">
                  <span className="text-white font-display font-bold text-2xl">A</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-ink-700 mb-2">
                  {companyInfo.legalName}
                </h3>
                <p className="text-sm text-ink-400 mb-6">
                  {companyInfo.location}
                </p>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    {companyInfo.complianceStatus}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-ink-50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-400">CIN</span>
                    <span className="font-mono text-xs text-ink-700">{companyInfo.cin}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-400">Regulator</span>
                    <span className="text-xs text-ink-700 text-right max-w-[60%]">{companyInfo.regulator}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
