import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DemostracionVariant: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      id="demostracion"
      className="min-h-screen lg:h-screen flex flex-col justify-center py-6 sm:py-8 bg-[#0B0F19] text-white relative overflow-hidden border-t border-slate-800/60"
    >
      {/* Dark GIS grid pattern & ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container: Centered vertically and fits on screen */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center my-auto">
        
        {/* 1. Header Centrado */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            {t.demostracion.titlePart1}{' '}
            <span className="text-[#3CB4A3]">{t.demostracion.titleHighlight}</span>{' '}
            {t.demostracion.titlePart2}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            {t.demostracion.subtitle}
          </p>
        </div>

        {/* 2. Video Player & Caption (Aligned to video bounds) */}
        <div data-reveal="zoom-in" className="delay-150 w-full flex flex-col items-center justify-center mb-5 sm:mb-6">
          <div className="inline-flex flex-col items-start max-w-full">
            <div className="relative max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-auto h-auto max-h-[48vh] sm:max-h-[52vh] max-w-full object-contain block rounded-xl sm:rounded-2xl"
              >
                <source src="./demo.mp4" type="video/mp4" />
                <source src="./Assets/Vids/demo/demo.mp4" type="video/mp4" />
                <source src="/demo.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Caption / Nota aclaratoria alineada exactamente al borde izquierdo del video y en cursiva */}
            <div className="w-full text-left mt-2 sm:mt-2.5 px-1 select-none">
              <p className="text-[11px] sm:text-xs text-slate-400/80 font-normal italic leading-relaxed text-left tracking-tight">
                * {t.demostracion.caption}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Items con Check */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 select-none">
          
          {/* Item 1 */}
          <div data-reveal="fade-up" className="delay-200 flex items-center gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#3CB4A3] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3CB4A3] stroke-[2.5]" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-tight">
              {t.demostracion.check1}
            </span>
          </div>

          {/* Divisor vertical */}
          <div className="hidden sm:block w-px h-5 bg-slate-700/70" />

          {/* Item 2 */}
          <div data-reveal="fade-up" className="delay-300 flex items-center gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#3CB4A3] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3CB4A3] stroke-[2.5]" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-tight">
              {t.demostracion.check2}
            </span>
          </div>

          {/* Divisor vertical */}
          <div className="hidden sm:block w-px h-5 bg-slate-700/70" />

          {/* Item 3 */}
          <div data-reveal="fade-up" className="delay-400 flex items-center gap-2.5">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#3CB4A3] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3CB4A3] stroke-[2.5]" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-tight">
              {t.demostracion.check3}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DemostracionVariant;
