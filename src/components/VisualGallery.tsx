import React, { useState, useEffect } from 'react';
import { Eye, Sparkles, X, ShoppingCart, Tag, CheckCircle2 } from 'lucide-react';
import { visualsData } from '../data/visuals';
import { VisualAd } from '../types';
import { soundFx } from '../utils/sound';

export const VisualGallery: React.FC = () => {
  const [activeVisual, setActiveVisual] = useState<VisualAd | null>(null);

  // Lock body scroll and pause Lenis smooth scroll while lightbox modal is active
  useEffect(() => {
    if (!activeVisual) return;

    document.body.style.overflow = 'hidden';
    (window as any).lenis?.stop();

    return () => {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    };
  }, [activeVisual]);

  return (
    <section id="visuals" className="py-24 relative bg-[#FAFAFD] bg-noise border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 gpu-layer">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E11D48] text-white font-mono text-xs font-bold tracking-widest uppercase mb-3 shadow-md">
              <Tag className="w-4 h-4" />
              <span>OFFRE SPÉCIALE : 15€ SEULEMENT PAR AFFICHE !</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-extrabold text-[#0F172A] tracking-tight">
              AFFICHES PUBLICITAIRES <br />
              <span className="text-gradient-rose">SUR-MESURE À 15€</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-2">
            <p className="text-sm font-mono text-zinc-700">
              Découvrez ma sélection d'affiches publicitaires réalisées pour le high-tech, la beauté, le voyage et le soin.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E11D48] bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Conception d'affiche personnalisée pour 15€ seulement</span>
            </div>
          </div>
        </div>

        {/* Grid of Real Advertising Posters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visualsData.map((vis) => (
            <div
              key={vis.id}
              onClick={() => {
                soundFx.playSwoosh();
                setActiveVisual(vis);
              }}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="15€"
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-xl hover:border-[#E11D48] hover:shadow-2xl transition-all duration-300 p-3 relative gpu-layer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-zinc-900">
                <img
                  src={vis.image}
                  alt={vis.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 15€ Price Tag Badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-[#E11D48] text-white font-display font-extrabold text-sm shadow-lg border border-white/20 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>15€</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-mono text-[#F43F5E] font-bold">{vis.category}</span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1">{vis.title}</h3>
                  <p className="text-xs text-zinc-300 font-light mt-1">{vis.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white bg-[#E11D48] px-4 py-2 rounded-full w-max shadow-md">
                    <Eye className="w-4 h-4" />
                    <span>Agrandir l'affiche (15€)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 flex items-center justify-between">
                <div>
                  <span className="text-base font-display font-extrabold text-[#0F172A] group-hover:text-[#E11D48] transition-colors">
                    {vis.title}
                  </span>
                  <p className="text-[11px] font-mono text-zinc-500">{vis.category}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#E11D48] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                    15€ SEULEMENT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Lightbox Modal */}
      {activeVisual && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-2xl animate-fade-in">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveVisual(null);
            }}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-4 p-2">
            <div className="relative">
              <img
                src={activeVisual.image}
                alt={activeVisual.title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <div className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-[#E11D48] text-white font-display font-extrabold text-lg shadow-xl">
                15€ SEULEMENT
              </div>
            </div>

            <div className="text-center space-y-2 max-w-lg">
              <h3 className="text-3xl font-display font-extrabold text-white">{activeVisual.title}</h3>
              <p className="text-xs font-mono text-[#F43F5E] font-bold uppercase">{activeVisual.category}</p>
              <p className="text-xs font-mono text-zinc-300">{activeVisual.description}</p>
              <a
                href="#contact"
                onClick={() => setActiveVisual(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E11D48] text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all shadow-xl mt-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Commander votre affiche pour 15€</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
