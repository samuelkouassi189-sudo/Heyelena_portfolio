import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Lock, ExternalLink, Sparkles, Monitor, Tablet, Smartphone } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { soundFx } from '../utils/sound';

interface SiteShowcaseCarouselProps {
  onSelectProject: (project: Project) => void;
}

export const SiteShowcaseCarousel: React.FC<SiteShowcaseCarouselProps> = ({ onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const currentProject = projectsData[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#FAFAFD] via-white to-[#FAFAFD] overflow-hidden border-t border-b border-zinc-200">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E11D48]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12 gpu-layer">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DÉFILÉ INTERACTIF DE SITES INTERNET</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0F172A] tracking-tight">
              LE SHOWROOM <span className="text-gradient-rose">DES SITES CRÉÉS</span>
            </h2>
          </div>

          {/* Device Frame Switcher */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-zinc-200 shadow-sm">
            <button
              onClick={() => {
                soundFx.playClick();
                setDeviceFrame('desktop');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                deviceFrame === 'desktop' ? 'bg-[#E11D48] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setDeviceFrame('tablet');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                deviceFrame === 'tablet' ? 'bg-[#E11D48] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablette</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setDeviceFrame('mobile');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                deviceFrame === 'mobile' ? 'bg-[#E11D48] text-white font-bold' : 'text-zinc-600 hover:text-[#0F172A]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Browser Mockup Showcase Box */}
        <div className="relative mx-auto transition-all duration-300 ease-out gpu-layer" style={{
          maxWidth: deviceFrame === 'desktop' ? '100%' : deviceFrame === 'tablet' ? '768px' : '380px'
        }}>
          {/* Simulated Browser Frame Window */}
          <div className="rounded-3xl overflow-hidden bg-white border-2 border-zinc-300 shadow-2xl shadow-zinc-300/60">
            {/* Top Browser Bar */}
            <div className="px-6 py-4 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between gap-4">
              {/* Left Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E11D48] inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-xl mx-auto bg-white border border-zinc-300 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-mono text-zinc-700 shadow-xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">https://{currentProject.id}.elenasmith.com</span>
                <span className="ml-auto text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded font-bold">SSL Secure</span>
              </div>

              {/* Play Pause Controls */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-[#E11D48] transition-colors shadow-xs"
                aria-label="Play/Pause Showcase"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#E11D48]" /> : <Play className="w-4 h-4 text-zinc-700" />}
              </button>
            </div>

            {/* Browser Main Canvas Image Preview */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-zinc-900 group">
              <img
                key={currentProject.id}
                src={currentProject.image}
                alt={currentProject.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />

              {/* Bottom Info Floating Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-[#E11D48] text-white text-xs font-mono font-bold">
                    {currentProject.category}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
                    {currentProject.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-300 line-clamp-2">
                    {currentProject.longDescription}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundFx.playSwoosh();
                    onSelectProject(currentProject);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-6 py-3.5 rounded-full bg-white text-[#0F172A] font-display font-extrabold text-xs uppercase tracking-wider hover:bg-[#E11D48] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2 shrink-0"
                >
                  <span>Explorer le concept</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          {/* Direct Site Selector Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {projectsData.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentIndex(idx);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  currentIndex === idx
                    ? 'bg-[#E11D48] text-white font-bold scale-105 shadow-md'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-[#E11D48]'
                }`}
              >
                0{idx + 1}. {proj.title}
              </button>
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[#0F172A] hover:bg-[#E11D48] hover:text-white transition-colors shadow-sm"
              aria-label="Previous Site"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[#0F172A] hover:bg-[#E11D48] hover:text-white transition-colors shadow-sm"
              aria-label="Next Site"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
