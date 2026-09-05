import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-gold text-white shadow-gold hover:shadow-gold-lg border border-gold-400/30',
  secondary:
    'bg-white text-ink-700 border border-ink-200 hover:border-gold-400 hover:text-gold-600 shadow-premium',
  ghost:
    'text-ink-700 hover:text-gold-600 border border-transparent',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', href, children, className = '', target, rel, onClick }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`;

    if (href) {
      return (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

interface ArrowButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  target?: string;
  rel?: string;
}

export function ArrowButton({ children, href, variant = 'primary', target, rel }: ArrowButtonProps) {
  return (
    <Button href={href} variant={variant} target={target} rel={rel}>
      {children}
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}
