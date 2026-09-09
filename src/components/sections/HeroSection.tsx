import React, { useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const activeVideoIndex = useRef<number>(1);
  const isCrossfading = useRef<boolean>(false);
  const { t } = useLanguage();

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Start video 1
    v1.play().catch(() => {});
    v2.pause();

    const crossfadeDuration = 1.2; // seconds of smooth crossfade between loops

    const handleTimeCheck = () => {
      const activeVideo = activeVideoIndex.current === 1 ? v1 : v2;
      const nextVideo = activeVideoIndex.current === 1 ? v2 : v1;

      if (!activeVideo.duration || Number.isNaN(activeVideo.duration)) return;

      const timeLeft = activeVideo.duration - activeVideo.currentTime;

      if (timeLeft <= crossfadeDuration && !isCrossfading.current) {
        isCrossfading.current = true;
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});

        // Smoothly crossfade opacities
        if (activeVideoIndex.current === 1) {
          v1.style.opacity = '0';
          v2.style.opacity = '1';
        } else {
          v2.style.opacity = '0';
          v1.style.opacity = '1';
        }

        setTimeout(() => {
          activeVideo.pause();
          activeVideo.currentTime = 0;
          activeVideoIndex.current = activeVideoIndex.current === 1 ? 2 : 1;
          isCrossfading.current = false;
        }, crossfadeDuration * 1000);
      }
    };

    const interval = setInterval(handleTimeCheck, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full flex items-center pt-20 md:pt-24 pb-8 overflow-hidden bg-slate-950">
      
      {/* Background Smooth Crossfade Video Loop (Layer 0) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Video 1 */}
        <video
          ref={video1Ref}
          src="./Assets/Vids/hero/herobg.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
        />

        {/* Video 2 (Crossfader) */}
        <video
          ref={video2Ref}
          src="./Assets/Vids/hero/herobg.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-0"
        />
      </div>

      {/* 45% Dark Overlay for optimal text contrast (Layer 1) */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none z-[1]"></div>

      {/* Hero Content (Layer 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center pt-24 sm:pt-32 md:pt-40">
          
          {/* H1 */}
          <h1
            data-reveal="fade-up"
            className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.14] mb-6 text-center"
          >
            {t.hero.titlePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3CB4A3] via-[#5DE0CE] to-[#8089DB]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p
            data-reveal="fade-up"
            className="delay-150 text-base sm:text-xl text-slate-100 font-normal leading-relaxed mb-8 max-w-2xl mx-auto text-center"
          >
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div
            data-reveal="fade-up"
            className="delay-300 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* CTA principal: Solicita una demo */}
            <a
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white bg-gradient-brand hover:opacity-95 shadow-xl shadow-black/20 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.hero.requestDemo}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* CTA secundario: Ver cómo funciona */}
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-black/30 hover:bg-black/45 border border-white/40 hover:border-white/70 backdrop-blur-md shadow-md transition-all"
            >
              <span>{t.hero.seeHowItWorks}</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
