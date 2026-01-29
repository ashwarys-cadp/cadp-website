import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
}

export function Card({
  children,
  className,
  href,
  hover = true,
}: CardProps) {
  const cardStyles = cn(
    'bg-white rounded-xl border border-neutral-200 overflow-hidden',
    hover && 'transition-shadow duration-200 hover:shadow-lg',
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardStyles}>
        {children}
      </Link>
    );
  }

  return <div className={cardStyles}>{children}</div>;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

export function CardImage({
  src,
  alt,
  className,
  aspectRatio = 'video',
}: CardImageProps) {
  const aspectStyles = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[2/1]',
  };

  return (
    <div className={cn('relative', aspectStyles[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({
  children,
  className,
  as: Component = 'h3',
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        'font-semibold text-neutral-900 leading-tight',
        Component === 'h2' && 'text-xl',
        Component === 'h3' && 'text-lg',
        Component === 'h4' && 'text-base',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-neutral-600 text-sm mt-2 line-clamp-3', className)}>
      {children}
    </p>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'px-5 py-3 border-t border-neutral-100 bg-neutral-50',
        className
      )}
    >
      {children}
    </div>
  );
}
