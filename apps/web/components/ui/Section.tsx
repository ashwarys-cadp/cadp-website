import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'primary';
  id?: string;
}

export function Section({
  children,
  className,
  background = 'white',
  id,
}: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    primary: 'bg-primary-900 text-white',
  };

  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', bgStyles[background], className)}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-600 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
