import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.div
      className={`flex flex-col ${alignment} gap-4 mb-16`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink-700 leading-tight max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-ink-400 max-w-2xl leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
      <div className="h-px w-16 bg-gradient-gold mt-4" />
    </motion.div>
  );
}
