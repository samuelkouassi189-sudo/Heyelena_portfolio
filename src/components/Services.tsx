import React, { useState } from 'react';
import { Code, Layout, Sparkles, Palette, ArrowRight, CheckCircle2, Globe, CreditCard } from 'lucide-react';
import { servicesData } from '../data/services';
import { soundFx } from '../utils/sound';

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string>(servicesData[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code': return Code;
      case 'Layout': return Layout;
      case 'Sparkles': return Sparkles;
      case 'Palette': return Palette;
      default: return Code;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#FAFAFD] bg-noise border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 gpu-layer">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs tracking-widest uppercase mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span>03. SERVICES & EXPERTISES SUR-MESURE</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-extrabold text-[#0F172A] tracking-tight">
              DES PRESTATIONS WEB <span className="text-gradient-rose">SUR-MESURE</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold border-2 border-[#E11D48] shadow-sm">
              <Globe className="w-4 h-4 text-[#E11D48]" />
              <span>100% À DISTANCE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E11D48] text-white font-mono text-xs font-bold shadow-sm">
              <CreditCard className="w-4 h-4" />
              <span>PAIEMENT WAVE / VIREMENT BANCAIRE</span>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);
            const isOpen = activeService === service.id;

            return (
              <div
                key={service.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveService(service.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="SERVICE"
                className={`rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 border-2 gpu-layer ${
                  isOpen
                    ? 'bg-white text-black border-[#E11D48] shadow-2xl scale-[1.01]'
                    : 'bg-white/80 text-[#0F172A] border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Title & Number */}
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl font-mono font-bold ${isOpen ? 'text-[#E11D48]' : 'text-zinc-400'}`}>
                      {service.number}
                    </span>

                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: service.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className={`text-2xl md:text-3xl font-display font-extrabold ${isOpen ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-xs font-mono mt-1 ${isOpen ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? 'rotate-90 bg-[#E11D48] text-white' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isOpen && (
                  <div className="mt-8 pt-8 border-t border-zinc-200 grid md:grid-cols-12 gap-8 animate-fade-in">
                    <div className="md:col-span-6 space-y-4">
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-bold">Description de la prestation</h4>
                      <p className="text-base text-zinc-800 font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <h4 className="text-xs font-mono text-[#E11D48] uppercase tracking-wider font-bold">Livrables Inclus</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs font-mono text-zinc-900 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                            <CheckCircle2 className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
