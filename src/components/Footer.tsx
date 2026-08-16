import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Globe, CreditCard } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('fr-FR', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FAFAFD] bg-noise border-t border-zinc-200 pt-20 pb-12 overflow-hidden text-zinc-600">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top Big Typography Sign-off */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold">
                <Globe className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>TRAVAIL 100% À DISTANCE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D48] text-white text-xs font-mono font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                <span>SITES INTERNET DÈS 150€</span>
              </div>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-extrabold text-[#0F172A] tracking-tighter">
              ELENA SMITH
            </h2>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="HAUT"
            aria-label="Back to Top"
            className="w-20 h-20 rounded-full bg-white border border-zinc-300 flex flex-col items-center justify-center text-[#0F172A] hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] transition-all transform hover:-translate-y-2 group shrink-0 shadow-lg"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            <span className="text-[10px] font-mono tracking-widest mt-1 uppercase font-bold">HAUT</span>
          </button>
        </div>

        {/* Footer Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          {/* Work mode */}
          <div className="space-y-2">
            <div className="text-[#0F172A] font-extrabold tracking-wider uppercase">MODE DE TRAVAIL</div>
            <div className="flex items-center gap-2 text-zinc-800 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse" />
              <span>100% à Distance (Remote)</span>
            </div>
            <div className="text-zinc-600">Création de site dès 150€</div>
            <div className="text-zinc-500">Heure locale: {time || '19:23:00'}</div>
          </div>

          {/* Specializations */}
          <div className="space-y-2">
            <div className="text-[#0F172A] font-extrabold tracking-wider uppercase">MES 3 SPÉCIALITÉS</div>
            <div className="text-zinc-700 space-y-1 font-medium">
              <p>• Création de Sites Internet (dès 150€)</p>
              <p>• Design de Sites Internet (UI/UX)</p>
              <p>• Affiches Publicitaires & Visuels</p>
            </div>
          </div>

          {/* Payments accepted */}
          <div className="space-y-2">
            <div className="text-[#0F172A] font-extrabold tracking-wider uppercase">PAIEMENTS ACCEPTÉS</div>
            <div className="text-zinc-700 space-y-1 font-medium">
              <p>• 🌍 Afrique : <strong>Wave & Mobile Money</strong></p>
              <p>• 🇪🇺 🇺🇸 Europe & Amérique : <strong>Virement Bancaire & CB</strong></p>
            </div>
          </div>

          {/* Credits */}
          <div className="space-y-2">
            <div className="text-[#0F172A] font-extrabold tracking-wider uppercase">AVIS & DEVIS</div>
            <p className="text-zinc-600">Devis gratuit sous 24h.</p>
            <p className="text-[#E11D48] font-extrabold">Standard Awwwards • FWA • CSSDA</p>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 text-[11px] font-mono text-zinc-500">
          <p>© 2026 Elena Smith. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span>Conçu avec</span>
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current" />
            <span>pour Elena Smith</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
