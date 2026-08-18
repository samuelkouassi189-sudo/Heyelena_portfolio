import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Layout, Download, Check, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/sound';

export const DigitalShop: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'templates' | 'ebooks'>('all');

  const products = [
    {
      id: 'template-luxe',
      title: 'Template Web "Luxe & Editorial"',
      category: 'Templates Web',
      type: 'templates',
      price: 'Dispo par Email',
      description: 'Template Figma & React moderne et épuré idéal pour portfolios, studios et marques d\'exception.',
      features: ['Compatible Figma & React', '100% Responsive & Animations', 'Documentation & composants UI'],
      badge: 'Best-Seller'
    },
    {
      id: 'template-resto',
      title: 'Template Web "Gastronomie & Resto"',
      category: 'Templates Web',
      type: 'templates',
      price: 'Dispo par Email',
      description: 'Maquette web clé en main avec module de réservation et menu interactif pour restaurants.',
      features: ['Figma & Code React', 'Système de réservation UI', 'Kit de couleurs & typographies'],
      badge: 'Populaire'
    },
    {
      id: 'ebook-webdesign',
      title: 'Ebook "Créer un Site Qui Marque"',
      category: 'Ebooks & Guides',
      type: 'ebooks',
      price: 'Dispo par Email',
      description: 'Guide pratique étape par étape pour concevoir des sites internet attractifs sans fautes de goût.',
      features: ['Format PDF & EPUB 120 pages', 'Secret des palettes & grilles', 'Études de cas réels'],
      badge: 'Nouveau'
    },
    {
      id: 'ebook-affiches',
      title: 'Ebook "Masterclass Affiches Publicitaires"',
      category: 'Ebooks & Guides',
      type: 'ebooks',
      price: 'Dispo par Email',
      description: 'Le guide complet pour réussir la composition et la typographie de vos affiches publicitaires.',
      features: ['Format PDF HD', 'Conseils mise en page & couleurs', '5 Templates Figma d\'affiches offerts'],
      badge: 'Essentiel'
    }
  ];

  const filteredProducts = selectedTab === 'all'
    ? products
    : products.filter(p => p.type === selectedTab);

  return (
    <section id="shop" className="py-24 relative bg-gradient-to-b from-[#FAFAFD] via-white to-[#FAFAFD] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 gpu-layer">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs tracking-widest uppercase mb-3 font-bold">
              <ShoppingBag className="w-4 h-4 text-[#E11D48]" />
              <span>05. BOUTIQUE DIGITALE — TEMPLATES & EBOOKS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-[#0F172A] tracking-tight">
              TEMPLATES WEB <span className="text-gradient-rose">& EBOOKS EXCLUSIFS</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-full border border-zinc-200 shadow-xs">
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedTab('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                selectedTab === 'all' ? 'bg-[#0F172A] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              Tous ({products.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedTab('templates');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                selectedTab === 'templates' ? 'bg-[#E11D48] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Templates Web</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setSelectedTab('ebooks');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                selectedTab === 'ebooks' ? 'bg-[#8B5CF6] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ebooks & Guides</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-lg flex flex-col justify-between space-y-6 hover:border-[#E11D48] hover:shadow-2xl transition-all duration-300 gpu-layer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-[11px] font-mono font-bold">
                    {product.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E11D48] bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                    {product.price}
                  </span>
                </div>

                <h3 className="text-xl font-display font-extrabold text-[#0F172A] group-hover:text-[#E11D48] transition-colors">
                  {product.title}
                </h3>

                <p className="text-xs text-zinc-600 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-zinc-700">
                      <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                onClick={() => {
                  soundFx.playClick();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full py-3.5 rounded-2xl bg-[#0F172A] text-white font-display font-extrabold text-xs uppercase tracking-wider hover:bg-[#E11D48] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Obtenir par Email</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
