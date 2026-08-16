import React from 'react';
import { X, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { soundFx } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
              <span className="text-xs font-mono text-zinc-500">{project.year} • Client: {project.client}</span>
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

          {/* Main Showcase Image */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 aspect-video shadow-lg">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
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
                  <img src={imgUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Live Preview CTA */}
          <div className="flex justify-end pt-4 border-t border-zinc-200">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                soundFx.playClick();
                alert(`Démonstration en direct de ${project.title} initialisée !`);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="px-8 py-4 rounded-full bg-[#7C3AED] text-white font-display font-extrabold text-sm tracking-wider uppercase hover:bg-[#0F172A] transition-colors flex items-center gap-3 shadow-lg"
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
