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
    'bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-700 border-2 border-primary-950 hover:border-primary-800 shadow-sm',
  secondary:
    'bg-accent-700 text-white hover:bg-accent-800 focus:ring-accent-600 border-2 border-accent-800 hover:border-accent-900 shadow-sm',
  outline:
    'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white focus:ring-primary-700 bg-white',
  ghost:
    'text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 focus:ring-neutral-500 border-2 border-transparent hover:border-neutral-300',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-2.5 text-[0.9375rem]',
  lg: 'px-10 py-3.5 text-base',
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
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'tracking-wide font-serif',
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
