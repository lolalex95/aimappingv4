import React, { useState, useEffect, useRef } from 'react';
import { BeforeAfterSlider } from '../interactive/BeforeAfterSlider';
import { AlertCircle, SplitSquareVertical, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PuntoPartida: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const comparatorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const userHasDraggedRef = useRef<boolean>(false);

  // Stop animation immediately if user manually drags
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
    if (!el) return;

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
        // Smooth sweep to the right
        .to(proxy, {
          val: 82,
          duration: 1.1,
          ease: 'power2.inOut',
        })
        // Smooth return settling to 50%
        .to(proxy, {
          val: 50,
          duration: 0.9,
          ease: 'power2.out',
        });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: false,
        onEnter: playSweepAnimation,
        onEnterBack: playSweepAnimation,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="punto-de-partida" className="py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
      {/* 1. Header and 3 Impact Cards aligned with 86vw Container */}
      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header Centered & Full Width */}
        <div data-reveal="fade-up" className="w-full text-center mb-12">
          {/* Title: La infraestructura cambia. La información no siempre se actualiza al mismo ritmo. */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight max-w-4xl mx-auto">
            La infraestructura cambia. La información no siempre se actualiza al mismo ritmo.
          </h2>
        </div>

        {/* 3 Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Más verificaciones */}
          <div
            data-reveal="fade-up"
            className="gis-card p-6 rounded-2xl bg-white border border-slate-200 delay-100"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#4F5051] mb-2">Más recorridos y controles</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hay que volver al campo para verificar qué cambió.
            </p>
          </div>

          {/* Card 2: Más tiempo y revisiones */}
          <div
            data-reveal="fade-up"
            className="gis-card p-6 rounded-2xl bg-white border border-slate-200 delay-200"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F56A1]/10 text-[#4F56A1] flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#4F5051] mb-2">Más tiempo y revisiones</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Relevar manualmente lleva más tiempo y aumenta el riesgo de errores.
            </p>
          </div>

          {/* Card 3: Mayor costo operativo */}
          <div
            data-reveal="fade-up"
            className="gis-card p-6 rounded-2xl bg-white border border-slate-200 delay-300"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4">
              <SplitSquareVertical className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#4F5051] mb-2">Mayor costo operativo</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Más recorridos y horas de trabajo aumentan los costos.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Evidencia visual comparativa: Balanced 86vw Container */}
      <div
        ref={comparatorRef}
        className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN (lg:col-span-5): Copy Description */}
          <div data-reveal="fade-right" className="lg:col-span-5 flex flex-col justify-center">
            {/* Main Large Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-4">
              Lo registrado puede dejar de reflejar lo que existe.
            </h3>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Detectar esos cambios ayuda a mantener la información actualizada.
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
