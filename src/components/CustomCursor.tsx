import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const updatePosition = () => {
      // Smooth lerp for ring movement
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], input, textarea');
      if (interactive) {
        setIsHovered(true);
        const textAttr = interactive.getAttribute('data-cursor');
        setCursorText(textAttr || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[#E11D48]/80 flex items-center justify-center transition-all duration-150 ease-out gpu-layer ${
          isHovered
            ? 'w-20 h-20 bg-[#E11D48]/10 backdrop-blur-xs border-[#E11D48] scale-100'
            : 'w-7 h-7 scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest font-bold text-[#E11D48] uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[#E11D48] rounded-full transition-opacity duration-150 gpu-layer ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
