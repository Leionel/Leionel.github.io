import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/85 p-4 sm:p-8 backdrop-blur-md animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:bg-black/90 hover:text-white"
          aria-label="Close image preview"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex max-h-[80vh] items-center justify-center overflow-auto bg-black/40 p-2">
          <img src={src} alt={alt} className="max-h-[78vh] w-auto rounded-lg object-contain" />
        </div>

        {caption && (
          <div className="border-t border-white/10 bg-zinc-950/80 px-6 py-3.5 text-center">
            <p className="text-xs sm:text-sm text-zinc-300 font-medium">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
