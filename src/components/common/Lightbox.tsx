import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: string; url: string; title: string; category: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 select-none"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-aura-surface/80 border border-aura-border text-aura-cream hover:text-aura-gold transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-aura-surface/80 border border-aura-border text-aura-cream hover:text-aura-gold transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-aura-surface/80 border border-aura-border text-aura-cream hover:text-aura-gold transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image & Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-w-full max-h-[75vh] object-contain rounded-xl border border-aura-border shadow-2xl"
        />
        <div className="mt-4 text-center">
          <span className="text-[11px] font-semibold tracking-widest text-aura-gold uppercase block mb-1">
            {currentImage.category}
          </span>
          <h3 className="font-serif text-xl font-bold text-aura-cream">{currentImage.title}</h3>
          <p className="text-xs text-aura-cream/50 mt-1">
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

