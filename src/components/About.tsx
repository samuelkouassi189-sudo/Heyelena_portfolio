import React, { useState } from 'react';
import { Sparkles, Code2, Palette, Globe, CheckCircle2, ShoppingBag, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const About: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    { url: '/images/elena_asset_1.webp', label: 'Elena Smith — Studio & Direction Artistique' },
    { url: '/images/elena_asset_8.webp', label: 'Design de Sites Web & Interfaces UI/UX' },
    { url: '/images/elena_asset_11.webp', label: 'Conception d\'Affiches Publicitaires Sur-Mesure' },
    { url: '/images/elena_asset_4.webp', label: 'Création de Templates Web & Ebooks' },
  ];

  const skills = [
    { name: 'Création de Sites Internet Sur-Mesure', desc: 'Sites vitrines & plateformes web modernes, fluides et élégantes', icon: Code2, color: '#E11D48' },
    { name: 'Design de Sites Internet (UI/UX)', desc: 'Maquettes Figma, direction artistique & ergonomie sur-mesure', icon: Palette, color: '#8B5CF6' },
    { name: 'Conception d\'Affiches Publicitaires', desc: 'Visuels haute définition à fort impact pour marques et événements', icon: Sparkles, color: '#F43F5E' },
    { name: 'Vente de Templates Web & Ebooks', desc: 'Ressources prêt-à-l\'emploi & guides pratiques design', icon: ShoppingBag, color: '#F59E0B' },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#FAFAFD] bg-noise border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 gpu-layer">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs tracking-widest uppercase mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span>01. À PROPOS DE MOI</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-[#0F172A] tracking-tight">
              SITES INTERNET, AFFICHES PUBLICITAIRES <br />
              <span className="text-gradient-rose">& RESSOURCES DIGITALES</span>
            </h2>
          </div>

          {/* Remote Callout Box */}
          <div className="bg-white text-black p-5 rounded-2xl shadow-xl max-w-md space-y-1 border border-zinc-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E11D48]">
              <Globe className="w-4 h-4" />
              <span>TRAVAIL 100% À DISTANCE</span>
            </div>
            <p className="text-xs font-mono text-zinc-700">
              « Je collabore à distance avec des clients du monde entier. Écrivez-moi par email pour discuter de vos projets ! »
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo Gallery & Showcase Left */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group rounded-3xl overflow-hidden bg-white p-2 shadow-xl border border-zinc-200 gpu-layer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100">
                <img
                  src={photos[activePhoto].url}
                  alt={photos[activePhoto].label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-zinc-200 shadow-md">
                  <p className="text-xs font-mono text-[#E11D48] font-bold">
                    {photos[activePhoto].label}
                  </p>
                  <p className="text-[10px] text-zinc-600 font-mono mt-1">Elena Smith • Directrice Artistique & Designer Web</p>
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-3">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setActivePhoto(idx);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  data-cursor="VIEW"
                  aria-label={`View photo ${idx + 1}`}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activePhoto === idx ? 'border-[#E11D48] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Bio & Skills Right */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-zinc-700 font-light text-base md:text-lg leading-relaxed">
              <p>
                Je suis <strong className="text-[#0F172A] font-bold">Elena Smith</strong>, Directrice Artistique & Designer Web. Spécialisée dans la <span className="text-[#E11D48] font-semibold">Création de Sites Internet Sur-Mesure</span>, le <span className="text-[#8B5CF6] font-semibold">Design d'Interfaces UI/UX</span>, la conception d'<span className="text-[#F43F5E] font-semibold">Affiches Publicitaires</span> et la création de <span className="text-[#F59E0B] font-semibold">Templates Web & Ebooks</span>.
              </p>
              <p>
                Je travaille <strong className="text-[#0F172A] font-bold">100% à distance</strong> avec des entreprises et créateurs à l'international. Chaque projet est développé sur-mesure pour refléter l'identité unique de votre entreprise.
              </p>
            </div>

            {/* Core Specializations Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-zinc-500 tracking-wider uppercase font-bold">
                MES DOMAINES D'EXPERTISE
              </h3>

              <div className="space-y-3">
                {skills.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white text-[#0F172A] p-5 rounded-2xl shadow-md border border-zinc-200 flex items-center justify-between hover:scale-[1.01] hover:border-[#E11D48] transition-all gpu-layer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: skill.color }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-lg text-[#0F172A]">
                            {skill.name}
                          </h4>
                          <p className="text-xs font-mono text-zinc-600">{skill.desc}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-rose-600 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
