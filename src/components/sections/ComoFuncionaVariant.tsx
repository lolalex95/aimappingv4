import React, { useRef, useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60;

export const ComoFuncionaVariant: React.FC = () => {
  const { language } = useLanguage();

  const stepsData = [
    {
      num: '1',
      stageName: language === 'en' ? 'Capture' : 'Captura',
      title: language === 'en' ? 'Recording target infrastructure' : 'Registramos la infraestructura a relevar',
      copy: language === 'en' ? 'We obtain imagery of assets using our camera system installed on vehicles.' : 'Obtenemos imágenes de los activos con nuestro sistema de cámaras instalado en vehículos.',
    },
    {
      num: '2',
      stageName: language === 'en' ? 'Processing' : 'Procesamiento',
      title: language === 'en' ? 'Identifying and classifying assets' : 'Identificamos y clasificamos los activos',
      copy: language === 'en' ? 'We analyze images with AI to identify and categorize assets automatically.' : 'Analizamos las imágenes con IA para identificar y clasificar los activos de forma automática.',
    },
    {
      num: '3',
      stageName: language === 'en' ? 'Delivery' : 'Entrega',
      title: language === 'en' ? 'Delivering ready-to-use data' : 'Entregamos información lista para usar',
      copy: language === 'en' ? 'We organize data into GIS formats to integrate directly into your systems.' : 'Organizamos los datos en formatos GIS para integrarlos directamente en tus sistemas.',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const canvas3Ref = useRef<HTMLCanvasElement>(null);
  const canvasRefs = [canvas1Ref, canvas2Ref, canvas3Ref];

  const [activeStep, setActiveStep] = useState<number>(0);
  const activeStepRef = useRef<number>(0);

  // Preloaded static high-efficiency WebP frames
  const imagesCacheRef = useRef<HTMLImageElement[][]>([[], [], []]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Immediate preloading of all frames on mount
  useEffect(() => {
    for (let s = 1; s <= 3; s++) {
      const stepArr: HTMLImageElement[] = [];
      for (let f = 0; f < TOTAL_FRAMES; f++) {
        const img = new Image();
        img.src = `./frames/step${s}/${String(f).padStart(3, '0')}.webp`;
        stepArr.push(img);
      }
      imagesCacheRef.current[s - 1] = stepArr;
    }

    canvasRefs.forEach((ref, idx) => {
      const canvas = ref.current;
      if (canvas) {
        const nativeW = 960;
        const nativeH = idx === 0 ? 717 : 540;
        canvas.width = nativeW;
        canvas.height = nativeH;

        const firstImg = imagesCacheRef.current[idx][0];
        if (firstImg) {
          const drawInitial = () => {
            const w = firstImg.naturalWidth || nativeW;
            const h = firstImg.naturalHeight || nativeH;
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d')?.drawImage(firstImg, 0, 0, w, h);
          };

          if (firstImg.complete && firstImg.naturalWidth > 0) {
            drawInitial();
          } else {
            firstImg.onload = drawInitial;
          }
        }
      }
    });
  }, []);

  // 60-120 FPS requestAnimationFrame render loop synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    let lastRenderedFrame = -1;
    let lastStep = -1;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.32;
      const p = currentProgressRef.current;

      let stepIdx = 0;
      let stepProgress = 0;

      if (p < 0.33) {
        stepIdx = 0;
        stepProgress = Math.min(1, Math.max(0, p / 0.33));
      } else if (p < 0.66) {
        stepIdx = 1;
        stepProgress = Math.min(1, Math.max(0, (p - 0.33) / 0.33));
      } else {
        stepIdx = 2;
        stepProgress = Math.min(1, Math.max(0, (p - 0.66) / 0.34));
      }

      if (activeStepRef.current !== stepIdx) {
        activeStepRef.current = stepIdx;
        setActiveStep(stepIdx);
      }

      const canvas = canvasRefs[stepIdx].current;
      const imgs = imagesCacheRef.current[stepIdx];

      if (canvas && imgs && imgs.length > 0) {
        // If user prefers reduced motion, show first static frame without continuous scrubbing
        const frameIndex = prefersReducedMotion
          ? 0
          : Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(stepProgress * (TOTAL_FRAMES - 1))));

        if (frameIndex !== lastRenderedFrame || stepIdx !== lastStep) {
          lastRenderedFrame = frameIndex;
          lastStep = stepIdx;

          const img = imgs[frameIndex];
          if (img && img.complete) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const w = img.naturalWidth || canvas.width;
              const h = img.naturalHeight || canvas.height;
              if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
              }
              ctx.clearRect(0, 0, w, h);
              ctx.drawImage(img, 0, 0, w, h);
            }
          }
        }
      }
    };

    gsap.ticker.add(renderLoop);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, container);

    return () => {
      gsap.ticker.remove(renderLoop);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="relative bg-[#F8FAFC] border-t border-slate-200 h-[540vh]"
    >
      {/* Sticky Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-16 overflow-hidden z-20 bg-[#F8FAFC]"
      >
        {/* Unified Container: header + animation closely paired */}
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center">
        {/* Full-width Centered Header raised higher and enlarged */}
        <div className="max-w-6xl w-full mx-auto text-center mb-10 sm:mb-12 lg:mb-14 -translate-y-3 sm:-translate-y-6 md:-translate-y-7 select-none">
          {/* Eyebrow */}
          <span className="block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#3CB4A3] mb-2 sm:mb-2.5 select-none">
            {language === 'en' ? 'HOW IT WORKS' : 'ASÍ FUNCIONA'}
          </span>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#4F5051] tracking-tight leading-tight whitespace-nowrap">
            {language === 'en' ? (
              <>
                From imagery to{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  ready-to-use
                </span>{' '}
                data
              </>
            ) : (
              <>
                De imágenes a{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  información
                </span>{' '}
                lista para usar
              </>
            )}
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-slate-500 font-normal leading-relaxed mt-2.5 max-w-3xl mx-auto">
            {language === 'en'
              ? 'A simple process defined around the specific assets and data you need to survey.'
              : 'Un proceso simple, definido según los activos y datos que necesitas relevar.'}
          </p>
        </div>

        {/* Main Area: Left (Video/Canvas) + Right (Stepper) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          {/* LEFT (lg:col-span-6): Video/Canvas Sequence */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex items-center justify-center relative">
            <div className="relative w-full aspect-video max-h-[460px] lg:max-h-[500px] flex items-center justify-center bg-transparent organic-video-mask overflow-hidden">
              
              {/* Step 1 Canvas */}
              <canvas
                ref={canvas1Ref}
                className={`absolute inset-0 w-full h-full object-contain scale-[1.05] lg:scale-[1.10] organic-video-mask-step1 mix-blend-multiply brightness-[1.01] contrast-[1.02] transition-opacity duration-300 pointer-events-none ${
                  activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-label="Etapa 1: Captura de infraestructura con cámaras vehiculares"
              >
                <img src="./frames/step1/000.webp" alt="Etapa 1: Captura de infraestructura con cámaras" className="w-full h-full object-contain" />
              </canvas>

              {/* Step 2 Canvas */}
              <canvas
                ref={canvas2Ref}
                className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-300 pointer-events-none ${
                  activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-label="Etapa 2: Detección y procesamiento inteligente con IA"
              >
                <img src="./frames/step2/000.webp" alt="Etapa 2: Detección con IA" className="w-full h-full object-contain" />
              </canvas>

              {/* Step 3 Canvas */}
              <canvas
                ref={canvas3Ref}
                className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-300 pointer-events-none ${
                  activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-label="Etapa 3: Entrega de activos georreferenciados en GIS"
              >
                <img src="./frames/step3/000.webp" alt="Etapa 3: Entrega de datos GIS" className="w-full h-full object-contain" />
              </canvas>
            </div>
          </div>

          {/* RIGHT (lg:col-span-6): Stepper Vertical */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">

            {/* 3 Horizontal Zones (Stage Name | Vertical Stepper | Content) */}
            <div className="flex flex-col">
              {stepsData.map((step, idx) => {
                const isActive = activeStep === idx;
                const isDisactive = activeStep > idx;

                return (
                  <div
                    key={step.num}
                    className="grid grid-cols-[90px_28px_1fr] sm:grid-cols-[105px_32px_1fr] lg:grid-cols-[95px_32px_1fr] xl:grid-cols-[110px_34px_1fr] items-start min-h-[96px] sm:min-h-[108px]"
                  >
                    {/* ZONE 1: Columna Izquierda — Nombre de la etapa (Justificado a la derecha) */}
                    <div className="pt-0.5 select-none pr-3 sm:pr-3.5 text-right">
                      <span
                        className={`font-mono text-xs sm:text-sm tracking-wider font-bold transition-colors duration-300 block ${
                          isActive
                            ? 'text-[#3CB4A3]'
                            : isDisactive
                            ? 'text-slate-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {step.stageName}
                      </span>
                    </div>

                    {/* ZONE 2: Columna Central — Step Bar / Progress Vertical con altura fija */}
                    <div className="flex flex-col items-center relative">
                      {/* Círculo indicador */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 z-10 select-none ${
                          isActive
                            ? 'bg-[#3CB4A3] text-white shadow-md shadow-[#3CB4A3]/30 ring-4 ring-[#3CB4A3]/15 scale-110'
                            : isDisactive
                            ? 'bg-[#4F56A1] text-white'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isDisactive ? (
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          step.num
                        )}
                      </div>

                      {/* Línea vertical fija hacia el siguiente paso */}
                      {idx < stepsData.length - 1 && (
                        <div className="w-[2px] h-16 sm:h-20 my-1 rounded-full relative overflow-hidden bg-slate-200 shrink-0">
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-out ${
                              isDisactive
                                ? 'bg-[#4F56A1]'
                                : isActive
                                ? 'bg-gradient-to-b from-[#3CB4A3] to-slate-200'
                                : 'bg-transparent'
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {/* ZONE 3: Columna Derecha — Título y Copy del paso */}
                    <div className="pt-0.5 pl-3 sm:pl-3.5 lg:pl-4">
                      <h3
                        className={`text-sm sm:text-base lg:text-[1.06rem] xl:text-[1.12rem] font-semibold tracking-tight leading-snug transition-colors duration-300 xl:whitespace-nowrap ${
                          isActive
                            ? 'text-[#4F5051]'
                            : isDisactive
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Subtítulo / Copy: Se desvanece suavemente con mayor separación visual */}
                      <div
                        className={`transition-all duration-300 ease-out overflow-hidden ${
                          isActive
                            ? 'opacity-100 max-h-24 mt-3 sm:mt-3.5'
                            : 'opacity-0 max-h-0 mt-0 pointer-events-none'
                        }`}
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
                          {step.copy}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ComoFuncionaVariant;
