import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, Sparkles, Award, Globe, CheckCircle2, Star, Tag } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lightweight GPU-Optimized Canvas Background with IntersectionObserver pausing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Lightweight 25 particles max for maximum fps
    const particlesCount = Math.min(25, Math.floor(width / 40));
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];

    const colors = ['#E11D48', '#8B5CF6', '#F43F5E', '#F59E0B'];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const radialGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        400
      );
      radialGradient.addColorStop(0, 'rgba(225, 29, 72, 0.06)');
      radialGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.02)');
      radialGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(225, 29, 72, ${0.08 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-[#FAFAFD] bg-noise">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Hero Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 my-auto w-full space-y-12 gpu-layer">
        {/* Remote Work & Offers Top Callout Banner */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shadow-xl border-2 border-[#E11D48]">
            <Globe className="w-4 h-4 text-[#F43F5E] animate-pulse" />
            <span>TRAVAIL 100% À DISTANCE — CRÉATION SITES DÈS 150€ !</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E11D48] text-white font-mono text-xs font-bold shadow-lg">
            <Tag className="w-4 h-4" />
            <span>AFFICHES À 15€ SEULEMENT</span>
          </div>
        </div>

        {/* Hero Grid: Left Content + Right 2 Photos Showcase */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#E11D48]" />
                <span>DIRECTRICE ARTISTIQUE & CRÉATRICE WEB (22 ANS)</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[0.98] text-[#0F172A]">
                JE CRÉE DES <br />
                <span className="text-gradient-rose">SITES INTERNET</span> <br />
                <span className="text-outline hover:text-[#E11D48] transition-colors duration-500">
                  QUI MARQUENT.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-700 font-light leading-relaxed max-w-xl">
              Moi, c'est <strong className="text-[#0F172A] font-bold">Elena Smith</strong>. Spécialisée en <span className="text-[#E11D48] font-semibold">Création de Sites Internet (dès 150€)</span>, <span className="text-[#8B5CF6] font-semibold">Design UI/UX</span>, <span className="text-[#F43F5E] font-semibold">Affiches Publicitaires à 15€ SEULEMENT</span> (proposant également des Templates Web & Ebooks design).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                data-cursor="DÉCOUVRIR"
                className="px-8 py-4 rounded-full bg-[#E11D48] text-white font-display font-extrabold text-sm tracking-wider uppercase hover:bg-[#0F172A] transition-all transform hover:-translate-y-1 shadow-xl shadow-[#E11D48]/30 flex items-center gap-3"
              >
                <span>Découvrir mes sites</span>
                <ArrowDownRight className="w-5 h-5" />
              </a>

              <a
                href="#visuals"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                data-cursor="15€"
                className="px-8 py-4 rounded-full bg-white text-[#0F172A] border-2 border-zinc-200 font-display font-extrabold text-sm tracking-wider uppercase hover:border-[#E11D48] hover:text-[#E11D48] transition-all flex items-center gap-2 shadow-md"
              >
                <Tag className="w-4 h-4 text-[#E11D48]" />
                <span>Affiches (15€)</span>
              </a>

              <a
                href="#contact"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                data-cursor="TALK"
                className="px-6 py-4 rounded-full bg-zinc-100 text-zinc-800 font-display font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2"
              >
                <span>Me Contacter</span>
              </a>
            </div>

            {/* Micro Guarantees */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-zinc-600 border-t border-zinc-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />
                <span>Sites dès 150€</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F43F5E]" />
                <span>Affiches 15€ SEULEMENT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                <span>Vendeuse de Templates & Ebooks</span>
              </div>
            </div>
          </div>

          {/* Right Column: DUAL PHOTO SHOWCASE OF ELENA WITH FEMININE ELEGANCE */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
              {/* Photo 1: Main Large Frame */}
              <div className="absolute top-0 left-0 w-[82%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 group gpu-layer">
                <img
                  src="/images/elena_asset_1.webp"
                  alt="Elena Smith — Directrice Artistique & Créatrice Web"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-ping" />
                    <span className="text-xs font-display font-extrabold text-[#0F172A]">Elena Smith</span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-600 mt-0.5">Créatrice de Sites & Designer (22 ans)</p>
                </div>
              </div>

              {/* Photo 2: Secondary Overlapping Frame */}
              <div className="absolute bottom-4 right-0 w-[68%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white z-20 transform rotate-6 hover:rotate-0 transition-transform duration-500 group gpu-layer">
                <img
                  src="/images/elena_asset_8.webp"
                  alt="Elena Smith — Design Web & Affiches 15€"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0F172A] text-white rounded-2xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F43F5E]">
                    <Star className="w-3.5 h-3.5 fill-current text-[#F43F5E]" />
                    <span>Affiches 15€ • Templates & Ebooks</span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-300 mt-0.5">100% À Distance Worldwide</p>
                </div>
              </div>

              {/* Decorative Soft Rose Accent Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#E11D48]/20 via-[#8B5CF6]/20 to-[#F59E0B]/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Continuous Marquee Banner */}
      <div className="relative z-10 w-full mt-16 border-t border-b border-zinc-200 bg-white/80 backdrop-blur-md py-4 overflow-hidden shadow-xs">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {[
            'CRÉATION DE SITES INTERNET (DÈS 150€)',
            '✦',
            'AFFICHES PUBLICITAIRES (15€ SEULEMENT)',
            '✦',
            'VENDEUSE DE TEMPLATES WEB & EBOOKS',
            '✦',
            'DESIGN DE SITES WEB (UI/UX)',
            '✦',
            'TRAVAIL 100% À DISTANCE',
            '✦',
            'DISPONIBLE POUR VOS PROJETS',
            '✦',
          ].map((item, idx) => (
            <span
              key={idx}
              className="text-xs font-mono tracking-widest text-zinc-700 uppercase font-bold flex items-center gap-4 hover:text-[#E11D48] transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
