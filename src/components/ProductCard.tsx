import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Users, ShieldCheck, Network, Wallet } from 'lucide-react';

interface ProductCardProps {
  name: string;
  status: string;
  category: string;
  description: string;
  link: string;
  linkLabel: string;
  icon: string;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ShieldCheck,
  Network,
  Wallet,
};

const statusColors: Record<string, string> = {
  Active: 'bg-green-50 text-green-600 border-green-200',
  'In Development': 'bg-blue-50 text-blue-600 border-blue-200',
  Planned: 'bg-amber-50 text-amber-600 border-amber-200',
  Roadmap: 'bg-purple-50 text-purple-600 border-purple-200',
};

export function ProductCard({
  name,
  status,
  category,
  description,
  link,
  linkLabel,
  icon,
  index,
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const Icon = iconMap[icon] || Users;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group rounded-2xl border p-8 transition-all duration-500 ${
        hovered
          ? 'border-gold-400/40 shadow-gold-lg bg-white'
          : 'border-ink-100 shadow-premium bg-white'
      }`}
    >
      {/* Glass reflection */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
      >
        <div
          className={`absolute -inset-x-10 -top-10 h-20 bg-gradient-to-b from-white/60 to-transparent transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'rotate(15deg) translateY(-50%)' }}
        />
      </div>

      <div style={{ transform: 'translateZ(40px)' }} className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center border border-gold-200/50">
            <Icon className="w-6 h-6 text-gold-600" />
          </div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColors[status] || statusColors['Roadmap']}`}
          >
            {status}
          </span>
        </div>

        <p className="text-xs uppercase tracking-wider text-ink-300 mb-2">{category}</p>
        <h3 className="font-display text-2xl font-semibold text-ink-700 mb-3">{name}</h3>
        <p className="text-sm text-ink-400 leading-relaxed mb-6">{description}</p>

        <a
          href={link}
          target={link.startsWith('http') ? '_blank' : undefined}
          rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors group/link"
        >
          {linkLabel}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
