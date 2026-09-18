import React, { useState, useRef } from 'react';
import { Sparkles, ShoppingBag, Droplets, Flame, Star, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SignatureSection: React.FC = () => {
  const { recipes, addToCart } = useStore();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showTapFeedback, setShowTapFeedback] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Find signature drink or default
  const signatureRecipe =
    recipes.find((r) => r.id === 'rec-8' || r.name.toLowerCase().includes('caramel')) || recipes[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowTapFeedback(true);
    setTimeout(() => setShowTapFeedback(false), 700);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuteState = !isMuted;
    videoRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#0d0907] via-[#120d0a] to-[#0d0907] relative overflow-hidden text-aura-cream">
      {/* Background radial gold aura that mirrors the warm coffee tone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[600px] md:h-[750px] bg-gradient-to-b from-aura-gold/15 via-[#8a4a1f]/15 to-transparent rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />

      {/* Atmospheric drifting particles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-aura-gold/60 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full bg-aura-gold/40 blur-[1px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-aura-gold/50 blur-[0.5px] animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-aura-surface/90 border border-aura-gold/30 text-aura-gold text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HANDCRAFTED MASTERWORK</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-aura-cream tracking-tight">
            MIDNIGHT CARAMEL LATTE
          </h2>

          <p className="text-xs sm:text-base text-aura-cream/80 font-light mt-2 sm:mt-3 max-w-md mx-auto leading-relaxed">
            “Bold espresso, silky steamed microfoam, and handcrafted scorched sea-salt caramel drizzle.”
          </p>
        </div>

        {/* Centerpiece: Seamlessly Blended Dreamina AI Video */}
        {/* Dissolves naturally into the dark background without harsh rectangular borders or phone frames */}
        <div className="relative max-w-[320px] xs:max-w-[350px] sm:max-w-[400px] md:max-w-[440px] mx-auto mb-2 sm:mb-4">
          {/* Glowing back-illumination right behind the cup/latte */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] bg-gradient-to-tr from-aura-gold/25 via-[#c47d3c]/20 to-transparent rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

          {/* Video Container with Radial Edge Feather Mask */}
          <div
            onClick={togglePlay}
            className="relative cursor-pointer select-none mx-auto w-full aspect-[9/16] max-h-[460px] xs:max-h-[500px] sm:max-h-[560px] flex items-center justify-center"
          >
            {/* HTML5 Video with feathered radial dissolve (NO static image) */}
            <video
              ref={videoRef}
              src="/videos/dreamina-coffee.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 70% at 50% 50%, #000 35%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.3) 76%, transparent 95%)',
                maskImage:
                  'radial-gradient(ellipse 68% 70% at 50% 50%, #000 35%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.3) 76%, transparent 95%)',
              }}
            />

            {/* Seamless Vignette Overlays to guarantee 100% melt into #0d0907 background */}
            <div className="absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-[#0d0907] via-[#0d0907]/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#0d0907] via-[#0d0907]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#0d0907] via-[#0d0907]/50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#0d0907] via-[#0d0907]/50 to-transparent pointer-events-none" />

            {/* Discrete Floating Sound Toggle (Subtle & unobtrusive) */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-aura-gold/25 text-aura-cream/80 hover:text-aura-gold transition-all transform active:scale-95 shadow-md"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aura-cream/60" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aura-gold animate-pulse" />
              )}
            </button>

            {/* Subtle Tap Feedback Icon (Play / Pause) */}
            {(!isPlaying || showTapFeedback) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-aura-gold/40 text-aura-gold flex items-center justify-center shadow-xl transform transition-transform scale-100">
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Grounding Base Shadow (Gives coffee depth in 3D space) */}
          <div className="w-44 xs:w-52 sm:w-64 h-5 bg-black/90 rounded-full blur-xl mx-auto -mt-6 sm:-mt-8 pointer-events-none" />

          {/* Ambient Hint Text */}
          <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-widest text-aura-cream/40 mt-3 mb-6">
            Dreamina AI Extraction • Tap to play/pause
          </p>
        </div>

        {/* Feature Pills and Order Action */}
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 text-center">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-aura-surface/60 border border-aura-border/70 backdrop-blur-sm">
              <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-aura-gold mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-aura-cream/60 block">Roast</span>
              <span className="text-[11px] sm:text-xs font-semibold text-aura-cream truncate block">Dark Espresso</span>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl bg-aura-surface/60 border border-aura-border/70 backdrop-blur-sm">
              <Droplets className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-aura-gold mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-aura-cream/60 block">Milk</span>
              <span className="text-[11px] sm:text-xs font-semibold text-aura-cream truncate block">Microfoam</span>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-xl bg-aura-surface/60 border border-aura-border/70 backdrop-blur-sm">
              <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-aura-gold mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-aura-cream/60 block">Sweetness</span>
              <span className="text-[11px] sm:text-xs font-semibold text-aura-cream truncate block">Sea-Salt</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => signatureRecipe && addToCart(signatureRecipe)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2.5 shadow-lg shadow-aura-gold/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER NOW — Rs. {signatureRecipe ? signatureRecipe.price.toLocaleString() : '1,050'}</span>
            </button>

            <a
              href="#menu"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-aura-borderLight hover:border-aura-gold/60 text-aura-cream text-xs font-semibold tracking-widest uppercase text-center transition-colors"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
