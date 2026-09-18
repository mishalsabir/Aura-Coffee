import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, FastForward, ArrowRight, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface CoffeeIntroProps {
  onComplete: () => void;
}

const PHASES = [
  { time: 0, text: 'STAGE I • SINGLE-ORIGIN ESPRESSO EXTRACTION' },
  { time: 2.8, text: 'STAGE II • VELVET MICROFOAM INFUSION' },
  { time: 5.5, text: 'STAGE III • SCORCHED CARAMEL MASTERWORK' },
  { time: 7.2, text: 'WELCOME TO AURA ATELIER' },
];

export const CoffeeIntro: React.FC<CoffeeIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMuted, toggleMute, playPourSound, playSteamSound } = useAudio();

  const [phaseText, setPhaseText] = useState(PHASES[0].text);
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasFinishedRef = useRef(false);

  // 1. Organic Ambient Bokeh & Steam Particle Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate floating golden dust and curling steam particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle warm golden particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(time + p.phase) * p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 2 + p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 190, 144, ${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 163, 89, 0.4)';
        ctx.fill();
      });
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Video Playback, Sound, and Cinematic Progress Tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video
      .play()
      .then(() => {
        setIsLoaded(true);
        try {
          playPourSound();
          setTimeout(() => playSteamSound(), 2800);
        } catch (_) {
          // ignore sound auto-block
        }
      })
      .catch(() => {
        // Autoplay policy fallback
        setIsLoaded(true);
      });

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const current = video.currentTime;
      const total = video.duration;
      const pct = Math.min((current / total) * 100, 100);
      setProgress(pct);

      // Update Phase Text
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (current >= PHASES[i].time) {
          setPhaseText(PHASES[i].text);
          break;
        }
      }

      // Auto-transition when video completes
      if (current >= total - 0.4 && !hasFinishedRef.current) {
        handleEnter();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [playPourSound, playSteamSound]);

  const handleEnter = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFinishing(true);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#0a0604] transition-all duration-1000 select-none ${
        isFinishing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Glow that mirrors warm roasted coffee */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] md:w-[850px] h-[350px] sm:h-[650px] md:h-[850px] bg-gradient-to-tr from-aura-gold/20 via-[#8a4a1f]/20 to-transparent rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />

      {/* Ambient Particle Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Top Header Bar: Logo, Audio Toggle & Skip Control */}
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex items-center justify-between z-30 safe-top">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* AURA 3-leaf sprout emblem */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-aura-gold/40 flex items-center justify-center bg-aura-surface/80 backdrop-blur-md shadow-lg shadow-aura-gold/10">
            <svg viewBox="0 0 100 100" className="w-4 h-4 sm:w-5 sm:h-5 text-aura-gold fill-current">
              <path d="M50 15 C50 15 35 35 35 55 C35 70 45 80 50 80 C55 80 65 70 65 55 C65 35 50 15 50 15 Z" />
              <path d="M30 35 C20 45 20 60 30 70 C38 60 40 45 30 35 Z" opacity="0.75" />
              <path d="M70 35 C80 45 80 60 70 70 C62 60 60 45 70 35 Z" opacity="0.75" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.25em] text-aura-cream font-bold text-xs sm:text-sm">
              AURA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-aura-gold/80 uppercase font-medium">
              Atelier • 2026
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* Audio toggle button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 sm:p-2.5 rounded-full border border-aura-borderLight bg-aura-surface/70 text-aura-cream/80 hover:text-aura-gold hover:border-aura-gold/50 transition-colors backdrop-blur-md shadow-md"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aura-gold animate-bounce" />
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={handleEnter}
            className="group flex items-center space-x-1.5 sm:space-x-2 px-3.5 sm:px-4 py-2 rounded-full border border-aura-gold/40 bg-aura-surface/80 hover:bg-aura-gold hover:text-aura-dark text-[10px] sm:text-xs tracking-widest uppercase font-medium text-aura-cream transition-all duration-300 backdrop-blur-md shadow-lg"
          >
            <span>Skip</span>
            <FastForward className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </header>

      {/* Main Center Stage: Seamlessly Blended Dreamina AI Video */}
      {/* Dissolved into background using elliptical radial mask + 4-way feather gradients */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 pt-16 pb-20">
        {/* Brand Headline (Reveals smoothly) */}
        <div className="text-center mb-3 sm:mb-5 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-aura-surface/80 border border-aura-gold/30 text-aura-gold text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase mb-2 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>THE 2026 SENSORY EXPERIENCE</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aura-cream tracking-[0.12em] sm:tracking-[0.15em] gold-gradient-text drop-shadow-2xl">
            AURA COFFEE
          </h1>

          <p className="text-[10px] xs:text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-aura-cream/80 uppercase font-light mt-1 sm:mt-1.5">
            CRAFTED FOR THE MOMENT
          </p>
        </div>

        {/* Video Frame: 100% Seamless Dissolve into Website Canvas */}
        <div className="relative w-full max-w-[290px] xs:max-w-[330px] sm:max-w-[390px] md:max-w-[430px] aspect-[9/16] max-h-[46vh] sm:max-h-[50vh] flex items-center justify-center my-1 sm:my-2">
          {/* Backlight behind the coffee cup/latte */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] bg-gradient-to-tr from-aura-gold/30 via-[#c47d3c]/25 to-transparent rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />

          {/* Dreamina AI Video with Radial Mask (NO static image) */}
          <video
            ref={videoRef}
            src="/videos/dreamina-coffee.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-1000"
            style={{
              WebkitMaskImage:
                'radial-gradient(ellipse 65% 68% at 50% 50%, #000 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.25) 75%, transparent 95%)',
              maskImage:
                'radial-gradient(ellipse 65% 68% at 50% 50%, #000 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.25) 75%, transparent 95%)',
            }}
          />

          {/* 4-Directional Vignette Feathering to guarantee 0 visible edge borders */}
          <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-[#0a0604] via-[#0a0604]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#0a0604] via-[#0a0604]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-[#0a0604] via-[#0a0604]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-[#0a0604] via-[#0a0604]/50 to-transparent pointer-events-none" />
        </div>

        {/* Grounding Base Shadow */}
        <div className="w-40 xs:w-48 sm:w-56 h-4 bg-black/95 rounded-full blur-xl mx-auto -mt-4 pointer-events-none" />

        {/* Phase Narrative & Enter Button */}
        <div className="flex flex-col items-center justify-center mt-3 sm:mt-5 text-center max-w-sm">
          {/* Phase Badge */}
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-aura-gold animate-ping" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-aura-gold font-semibold uppercase">
              {phaseText}
            </span>
          </div>

          {/* Minimal Progress Bar */}
          <div className="w-36 sm:w-48 h-[2px] bg-aura-surface rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-aura-gold/40 via-aura-gold to-aura-gold/90 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* High-End "ENTER ATELIER" Call To Action */}
          <button
            onClick={handleEnter}
            className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-semibold text-xs tracking-[0.2em] uppercase flex items-center space-x-2 shadow-xl shadow-aura-gold/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>ENTER ATELIER</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
