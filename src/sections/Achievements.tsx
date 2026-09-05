import { motion } from 'framer-motion';
import { Award, Code2, Trophy } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle';
import { achievements } from '@/data/content';

const badgeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Web Summit': Award,
  DeveloperWeek: Code2,
  GSA: Trophy,
};

export function Achievements() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Recognition"
          title="Recognized By The World&rsquo;s Most Selective Stages."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {achievements.map((achievement, i) => {
            const Icon = badgeIcons[achievement.badge] || Award;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative group p-8 rounded-2xl border border-ink-100 bg-white shadow-premium hover:shadow-gold-lg hover:border-gold-300 transition-all duration-500"
              >
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-100/0 to-gold-100/0 group-hover:from-gold-100/40 group-hover:to-transparent transition-all duration-500" />
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200/50 flex items-center justify-center mb-6 group-hover:shadow-gold transition-all duration-500">
                  <Icon className="w-7 h-7 text-gold-600" />
                </div>

                <h3 className="font-display text-xl font-semibold text-ink-700 mb-3">
                  {achievement.title}
                </h3>
                <p className="text-sm text-ink-400 leading-relaxed">
                  {achievement.description}
                </p>

                <div className="mt-6 pt-6 border-t border-ink-50">
                  <span className="text-xs font-medium uppercase tracking-wider text-gold-600">
                    {achievement.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
