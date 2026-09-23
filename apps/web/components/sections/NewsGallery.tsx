import Image from 'next/image';
import { urlFor, type NewsGalleryImage } from '@/lib/sanity';
import { cn } from '@/lib/utils';

interface NewsGalleryProps {
  images: NewsGalleryImage[];
}

/** Consecutive half-width photos pair into one row; everything else runs full width. */
function toRows(images: NewsGalleryImage[]) {
  const rows: NewsGalleryImage[][] = [];
  for (const image of images) {
    const last = rows[rows.length - 1];
    if (image.display === 'half' && last?.length === 1 && last[0].display === 'half') {
      last.push(image);
    } else {
      rows.push([image]);
    }
  }
  return rows;
}

function GalleryFigure({ image, paired }: { image: NewsGalleryImage; paired: boolean }) {
  const dims = image.asset?.metadata?.dimensions;
  const alt = image.alt || image.caption || '';

  return (
    <figure>
      {paired ? (
        <div className="relative aspect-[3/2] overflow-hidden border border-neutral-200 bg-neutral-100">
          <Image
            src={urlFor(image).width(1200).height(800).url()}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="overflow-hidden border border-neutral-200 bg-neutral-100">
          <Image
            src={urlFor(image).width(2000).url()}
            alt={alt}
            width={dims?.width ?? 2000}
            height={dims?.height ?? 1333}
            sizes="(min-width: 896px) 896px, 100vw"
            className="w-full h-auto"
          />
        </div>
      )}
      {image.caption && (
        <figcaption className="mt-3 text-sm text-neutral-500 font-serif italic leading-relaxed">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function NewsGallery({ images }: NewsGalleryProps) {
  const rows = toRows(images);

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-700">
          From the Day
        </span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <div className="mt-8 space-y-10 md:space-y-12">
        {rows.map((row) => (
          <div
            key={row.map((image) => image._key).join('-')}
            className={cn(row.length === 2 && 'grid gap-10 md:grid-cols-2 md:gap-6')}
          >
            {row.map((image) => (
              <GalleryFigure key={image._key} image={image} paired={row.length === 2} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
