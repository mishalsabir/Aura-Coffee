import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../../data/initialData';
import { Maximize2, Camera } from 'lucide-react';
import { Lightbox } from '../common/Lightbox';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-[#0d0907] relative overflow-hidden text-aura-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-aura-surface border border-aura-gold/30 text-aura-gold text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-aura-cream">
            THE ATELIER GALLERY
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-aura-cream/70 font-light mt-2 sm:mt-3">
            Moments of light, extraction, and quiet craftsmanship inside AURA COFFEE.
          </p>
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[220px] sm:auto-rows-[280px]">
          {GALLERY_IMAGES.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-[#2c2018] bg-black/40 shadow-xl ${
                item.span || 'col-span-1 row-span-1'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-105"
              />

              {/* Hover Dark Vignette & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907]/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-semibold tracking-widest text-aura-gold uppercase block mb-1">
                  {item.category}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-aura-cream">{item.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-aura-surface/80 border border-aura-gold/40 flex items-center justify-center text-aura-gold">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex || 0}
        setCurrentIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};

