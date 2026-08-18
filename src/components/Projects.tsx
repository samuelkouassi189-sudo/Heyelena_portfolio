import React, { useState } from 'react';
import { ArrowUpRight, Award, Globe, Monitor } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { SiteShowcaseCarousel } from './SiteShowcaseCarousel';
import { soundFx } from '../utils/sound';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['Tous', 'Site Internet 3D', 'Site Vitrine', 'Site Immobilier', 'Site Restaurant', 'Site Éducatif'];

  const filteredProjects = selectedCategory === 'Tous'
    ? projectsData
    : projectsData.filter((p) => p.tags.includes(selectedCategory));

  return (
    <section id="projects" className="py-24 relative bg-[#FAFAFD] bg-noise">
      {/* Dynamic Showroom Carousel at top of Projects Section */}
      <div id="showroom" className="mb-24">
        <SiteShowcaseCarousel onSelectProject={(proj) => setSelectedProject(proj)} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 gpu-layer">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[#E11D48] font-mono text-xs tracking-widest uppercase mb-3 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span>02. SELECTION DE SITES INTERNET</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-extrabold text-[#0F172A] tracking-tight">
              SITES INTERNET <span className="text-gradient-rose">& CONCEPTIONS</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E11D48] text-white font-bold shadow-md'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-[#E11D48]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                soundFx.playSwoosh();
                setSelectedProject(project);
              }}
              onMouseEnter={() => soundFx.playHover()}
              data-cursor="VOIR SITE"
              className={`group cursor-pointer rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-xl flex flex-col justify-between p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#E11D48] gpu-layer ${
                idx === 0 ? 'md:col-span-2 lg:grid lg:grid-cols-12 lg:gap-8 items-center' : ''
              }`}
            >
              {/* Image / Video Preview Container */}
              <div
                className={`relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 ${
                  idx === 0 ? 'lg:col-span-7 h-full min-h-[300px]' : ''
                }`}
              >
                {project.youtubeId ? (
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                      title={project.title}
                      className="w-full h-full object-cover scale-125 border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                    />
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                {/* Video Badge */}
                {project.youtubeId && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>VIDÉO EN BOUCLE</span>
                  </div>
                )}

                {/* Award Badge Top Right */}
                {project.award && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-[#E11D48] text-[11px] font-mono font-bold shadow-md">
                    <Award className="w-3.5 h-3.5" />
                    <span>{project.award}</span>
                  </div>
                )}
              </div>

              {/* Text Info Container */}
              <div className={`space-y-4 pt-6 ${idx === 0 ? 'lg:col-span-5 lg:pt-0' : ''}`}>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-[#E11D48] font-bold">{project.category}</span>
                  <span className="text-zinc-400 font-bold">{project.client}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#0F172A] group-hover:text-[#E11D48] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick();
                      if (project.liveUrl) {
                        window.open(project.liveUrl, '_blank');
                      } else {
                        setSelectedProject(project);
                      }
                    }}
                    title="Lancer le site internet"
                    className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-[#0F172A] group-hover:bg-[#E11D48] group-hover:text-white transition-all shadow-xs"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </h3>

                <p className="text-sm font-light text-zinc-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Action Buttons & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                        window.open(project.liveUrl, '_blank');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E11D48] text-white text-xs font-mono font-bold hover:bg-[#0F172A] transition-colors shadow-sm"
                    >
                      <span>Lancer le Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
