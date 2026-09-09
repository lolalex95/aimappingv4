import React, { useState, useEffect, useRef } from 'react';
import { BeforeAfterSlider } from '../interactive/BeforeAfterSlider';
import { SemicircleCarousel } from '../interactive/SemicircleCarousel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const PuntoPartidaVariant: React.FC = () => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const comparatorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const userHasDraggedRef = useRef<boolean>(false);

  // Stop comparator animation immediately if user manually drags
  const handleUserPositionChange = (pos: number) => {
    userHasDraggedRef.current = true;
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
    setSliderPos(pos);
  };

  useEffect(() => {
    const el = comparatorRef.current;

    const ctx = gsap.context(() => {
      // 1. COMPARATOR SWEEP ANIMATION
      if (el) {
        const playSweepAnimation = () => {
          if (userHasDraggedRef.current) return;
          if (animationRef.current) {
            animationRef.current.kill();
          }

          const proxy = { val: 20 };
          setSliderPos(20);

          animationRef.current = gsap
            .timeline({
              delay: 0.25,
              onUpdate: () => {
                setSliderPos(proxy.val);
              },
            })
            .to(proxy, {
              val: 82,
              duration: 1.1,
              ease: 'power2.inOut',
            })
            .to(proxy, {
              val: 50,
              duration: 0.9,
              ease: 'power2.out',
            });
        };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 75%',
          once: false,
          onEnter: playSweepAnimation,
          onEnterBack: playSweepAnimation,
        });
      }
    }, comparatorRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="punto-de-partida"
      className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden relative"
    >
      {/* Ambient background accent glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-96 bg-gradient-to-b from-[#3CB4A3]/5 via-[#4F56A1]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header and Semicircle Nodes Container aligned with 86vw */}
      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        
        {/* Section Header Centered & Full Width */}
        <div data-reveal="fade-up" className="w-full text-center mb-16 sm:mb-20">
          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#4F5051] tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
            {t.puntoPartida.title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            {t.puntoPartida.subtitle}
          </p>
        </div>

        {/* Animated 5-node curved carousel */}
        <SemicircleCarousel />
      </div>

      {/* 2. Evidencia visual comparativa: Balanced 86vw Container */}
      <div
        ref={comparatorRef}
        className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-slate-200/90 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN (lg:col-span-5): Copy Description */}
          <div data-reveal="fade-right" className="lg:col-span-5 flex flex-col justify-center">
            {/* Main Large Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-4">
              {t.puntoPartida.sliderTitle}
            </h3>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {t.puntoPartida.sliderSubtitle}
            </p>
          </div>

          {/* RIGHT COLUMN (lg:col-span-7): The Image Comparison Slider */}
          <div data-reveal="fade-left" className="delay-150 lg:col-span-7 w-full">
            <BeforeAfterSlider sliderPosition={sliderPos} onPositionChange={handleUserPositionChange} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PuntoPartidaVariant;
