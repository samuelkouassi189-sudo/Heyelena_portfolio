import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Globe, Tag } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !muted;
    soundFx.setMuted(nextState);
    setMuted(nextState);
    if (!nextState) {
      soundFx.playClick();
    }
  };

  const navItems = [
    { label: 'Projets', href: '#projects' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Affiches', href: '#visuals' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-layer ${
        scrolled ? 'py-3.5 bg-[#FAFAFD]/90 backdrop-blur-md border-b border-zinc-200/80 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          data-cursor="HOME"
          className="group flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E11D48] to-[#8B5CF6] p-[2px] transition-transform duration-300 group-hover:scale-110 shadow-md">
            <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center font-display font-black text-sm text-white">
              ES
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm tracking-tight text-[#0F172A] group-hover:text-[#E11D48] transition-colors">
              ELENA SMITH
            </span>
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
              DIRECTRICE ARTISTIQUE & DESIGNER WEB
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7 glass-panel px-6 py-2.5 rounded-full border-zinc-200 shadow-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              data-cursor="GO"
              className="text-xs font-mono tracking-widest text-zinc-700 hover:text-[#E11D48] font-bold uppercase transition-colors relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E11D48] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          {/* Contact Special Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E11D48] text-white text-xs font-mono font-bold shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>Sur Devis / Email</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="SOUND"
            aria-label="Toggle Sound"
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-700 hover:text-[#E11D48] hover:border-[#E11D48] transition-all shadow-xs"
          >
            {muted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-[#E11D48] animate-pulse" />}
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            data-cursor="TALK"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E11D48] text-white font-display font-extrabold text-xs tracking-wider uppercase hover:bg-[#0F172A] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#E11D48]/20"
          >
            <span>Me Contacter</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#0F172A]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[#FAFAFD]/98 backdrop-blur-2xl flex flex-col p-8 justify-between border-t border-zinc-200 lg:hidden">
          <div className="flex flex-col gap-5 pt-4">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-display font-extrabold text-[#0F172A] hover:text-[#E11D48] flex items-center justify-between border-b border-zinc-200 pb-3"
              >
                <span>0{idx + 1}. {item.label}</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-400" />
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] text-xs font-mono font-bold w-max">
              <Globe className="w-4 h-4 text-[#E11D48] animate-pulse" />
              <span>Travail 100% à distance — Contact par Email</span>
            </div>
            <p className="text-xs font-mono text-zinc-500">
              ELENA SMITH • SITES INTERNET & AFFICHES PUBLICITAIRES
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
