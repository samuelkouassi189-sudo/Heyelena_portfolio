import React, { useEffect } from 'react';
import { X, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { soundFx } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and pause Lenis smooth scroll while modal is active
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = 'hidden';
    (window as any).lenis?.stop();

    return () => {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/80 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl my-auto text-[#0F172A]">
        {/* Header Close Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white/95 backdrop-blur-md border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-mono font-bold">
              {project.category}
            </span>
            {project.award && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65A30D]/10 border border-[#65A30D]/30 text-[#65A30D] text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>{project.award}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            onMouseEnter={() => soundFx.playHover()}
            data-cursor="CLOSE"
            aria-label="Close Project Details Modal"
            className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-[#0F172A] hover:bg-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Modal Body */}
        <div className="p-6 sm:p-10 space-y-10 max-h-[80vh] overflow-y-auto">
          {/* Title & Overview */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0F172A]">
                {project.title}
              </h2>
              <span className="text-xs font-mono text-zinc-500 font-bold">Client: {project.client}</span>
            </div>
            <p className="text-lg text-zinc-700 font-light leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Metrics Stats */}
          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xs font-mono text-zinc-500">{stat.label}</div>
                  <div className="text-2xl font-display font-extrabold text-[#7C3AED]">{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Main Showcase Video / Image */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 aspect-video shadow-lg bg-zinc-950">
            {project.youtubeId ? (
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                  title={project.title}
                  className="w-full h-full object-cover scale-105 border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>DÉMO VIDÉO EN BOUCLE</span>
                </div>
              </div>
            ) : (
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            )}
          </div>

          {/* Project Details Specs & Roles */}
          <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-zinc-200">
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">Rôle & Responsabilités</h3>
              <p className="text-base text-[#0F172A] font-semibold">{project.role}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">Livrables & Technologies</h3>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Architecture UI/UX & Prototypage Figma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Création de Site Internet Sur-Mesure & GSAP Motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                  <span>Direction Graphique & Visuels Publicitaires</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Gallery Showcase Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">Aperçus Visuels & Maquettes</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {project.gallery.map((imgUrl, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-zinc-200 aspect-4/3 shadow-sm">
                  <img src={imgUrl} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Preview CTA */}
          <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
            {project.liveUrl && (
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-bold hidden sm:inline-block">
                ✓ Lien Live Vérifié : {project.liveUrl}
              </span>
            )}
            <a
              href={project.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                soundFx.playClick();
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank');
                }
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="ml-auto px-8 py-4 rounded-full bg-[#E11D48] text-white font-display font-extrabold text-sm tracking-wider uppercase hover:bg-[#0F172A] transition-colors flex items-center gap-3 shadow-lg"
            >
              <span>Lancer la Démo Live</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
