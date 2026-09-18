import React, { useEffect, useRef } from 'react';

export const SteamParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Steam wisps array centered around where the coffee cup sits
    interface SteamP {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      maxLife: number;
      life: number;
    }

    const steamPuff: SteamP[] = [];
    const maxSteam = 45;

    // Ambient floating dust
    interface DustP {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }
    const dustParticles: DustP[] = [];
    const maxDust = 35;

    for (let i = 0; i < maxDust; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const createSteam = (targetX: number, targetY: number): SteamP => ({
      x: targetX + (Math.random() - 0.5) * 40,
      y: targetY + (Math.random() - 0.5) * 15,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.9 - Math.random() * 1.2,
      radius: 12 + Math.random() * 16,
      alpha: 0.18 + Math.random() * 0.15,
      maxLife: 80 + Math.random() * 60,
      life: 0,
    });

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Estimate coffee cup steam origin (centered horizontally or right-aligned on desktop)
      const cupOriginX = width > 768 ? width * 0.68 : width * 0.5;
      const cupOriginY = height * 0.55;

      if (steamPuff.length < maxSteam) {
        steamPuff.push(createSteam(cupOriginX, cupOriginY));
      }

      // Draw Steam
      for (let i = steamPuff.length - 1; i >= 0; i--) {
        const s = steamPuff[i];
        s.life++;
        s.x += s.vx + Math.sin(s.life * 0.05) * 0.4;
        s.y += s.vy;
        s.radius += 0.35;

        const progress = s.life / s.maxLife;
        const currentAlpha = Math.sin(progress * Math.PI) * s.alpha;

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(245, 235, 220, ${currentAlpha})`);
        grad.addColorStop(0.5, `rgba(215, 195, 175, ${currentAlpha * 0.5})`);
        grad.addColorStop(1, 'rgba(215, 195, 175, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) {
          steamPuff.splice(i, 1);
        }
      }

      // Draw floating golden ambient particles
      dustParticles.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.y < 0) d.y = height;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;

        ctx.fillStyle = `rgba(212, 163, 115, ${d.alpha})`;
        ctx.shadowColor = '#d4a373';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};

