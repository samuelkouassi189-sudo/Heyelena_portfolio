import React from 'react';
import { Instagram, Facebook, Twitter, ArrowUpRight, MessageCircle } from 'lucide-react';
import { soundFx } from '../utils/sound';

// TikTok Custom Inline SVG Icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.179 6.341 6.341 0 0 0 4.316 10.457 6.338 6.338 0 0 0 6.541-6.32V8.417a8.232 8.232 0 0 0 4.77 1.724V6.686a4.834 4.834 0 0 1-1.002 0z"/>
  </svg>
);

export const Socials: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@elena.smith.design',
      url: 'https://instagram.com',
      icon: Instagram,
      color: '#E4405F',
      badgeColor: '#E4405F',
      followers: 'DM Projets Ouverts',
      featured: true
    },
    {
      name: 'TikTok',
      handle: '@heyelena81',
      url: 'https://www.tiktok.com/@heyelena81',
      icon: TikTokIcon,
      color: '#000000',
      badgeColor: '#FE2C55',
      followers: 'Officiel',
      featured: false
    },
    {
      name: 'X / Twitter',
      handle: '@Elenasmithwb',
      url: 'https://x.com/Elenasmithwb',
      icon: Twitter,
      color: '#1DA1F2',
      badgeColor: '#1DA1F2',
      followers: '14.2K',
      featured: false
    },
    {
      name: 'Facebook',
      handle: 'Elena Smith Art Studio',
      url: 'https://facebook.com',
      icon: Facebook,
      color: '#1877F2',
      badgeColor: '#1877F2',
      followers: '9.8K',
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-[#FAFAFD] bg-noise border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 gpu-layer">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs tracking-widest uppercase font-bold">
            <MessageCircle className="w-4 h-4 text-[#E4405F]" />
            <span>05. RÉSEAUX SOCIAUX & CONTACT INSTAGRAM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0F172A]">
            ÉCRIVEZ-MOI DIRECTEMENT <span className="text-gradient-rose">SUR INSTAGRAM (DM)</span>
          </h2>
          <p className="text-xs font-mono text-zinc-600">
            N'hésitez pas à interagir directement en message privé sur Instagram pour me présenter vos projets de sites ou d'affiches !
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                data-cursor="DM"
                className={`group rounded-3xl p-6 border flex items-center justify-between transition-all duration-300 shadow-md hover:shadow-2xl gpu-layer ${
                  s.featured
                    ? 'bg-gradient-to-br from-[#E4405F] to-[#E11D48] text-white border-transparent hover:scale-[1.03]'
                    : 'bg-white text-[#0F172A] border-zinc-200 hover:border-[#E11D48]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                      s.featured ? 'bg-white text-[#E4405F]' : 'text-white'
                    }`}
                    style={{ backgroundColor: s.featured ? undefined : s.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-display font-extrabold text-base transition-colors ${
                      s.featured ? 'text-white' : 'text-[#0F172A] group-hover:text-[#E11D48]'
                    }`}>
                      {s.name}
                    </h3>
                    <p className={`text-xs font-mono truncate max-w-[120px] ${
                      s.featured ? 'text-rose-100' : 'text-zinc-500'
                    }`}>{s.handle}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    s.featured
                      ? 'bg-white text-[#E4405F] group-hover:bg-[#0F172A] group-hover:text-white'
                      : 'bg-zinc-100 text-zinc-700 group-hover:bg-[#E11D48] group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${
                    s.featured ? 'text-white' : 'text-rose-600'
                  }`}>{s.followers}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
