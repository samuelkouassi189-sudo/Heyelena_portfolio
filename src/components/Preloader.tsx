import React, { useEffect, useState } from 'react';
import { soundFx } from '../utils/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const duration = 500; // Ultra-fast ms
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsHiding(true);
        soundFx.playSwoosh();
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-16 bg-[#FAFAFD] text-[#0F172A] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] gpu-layer ${
        isHiding ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center text-xs tracking-widest uppercase font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse"></span>
          <span>ELENA SMITH — SITES INTERNET & DESIGN</span>
        </div>
        <span className="text-[#E11D48] font-bold">✦ 100% À DISTANCE</span>
      </div>

      {/* Center Big Typography */}
      <div className="my-auto space-y-3">
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-[#0F172A]">
            CRÉATION DE SITES
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-gradient-rose">
            & DESIGN WEB
          </h1>
        </div>
      </div>

      {/* Bottom Counter & Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <div className="text-xs font-mono text-zinc-500">
            <span>CHARGEMENT INSTANTANÉ...</span>
          </div>
          <div className="text-5xl md:text-7xl font-display font-extrabold font-mono text-[#E11D48]">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#8B5CF6] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
