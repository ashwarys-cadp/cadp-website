import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-600 border border-primary-800',
  secondary:
    'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-600 border border-accent-700',
  outline:
    'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white focus:ring-primary-600',
  ghost:
    'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'uppercase tracking-wide text-sm',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
