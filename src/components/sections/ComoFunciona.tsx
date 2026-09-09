import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Camera, Cpu, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StepData {
  num: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const TOTAL_FRAMES = 60;

const steps: StepData[] = [
  {
    num: '01',
    badge: 'CAPTURA',
    title: 'Recorrido y captura en terreno',
    description:
      'Registramos imágenes georreferenciadas de la infraestructura mediante cámaras montadas en vehículos, asegurando cobertura completa del área.',
    icon: Camera,
  },
  {
    num: '02',
    badge: 'PROCESAMIENTO',
    title: 'Detección e inteligencia artificial',
    description:
      'Nuestros modelos de visión computacional identifican, clasifican y extraen los atributos de cada activo visible en las capturas de forma automática.',
    icon: Cpu,
  },
  {
    num: '03',
    badge: 'ENTREGA',
    title: 'Información georreferenciada lista para usar',
    description:
      'Entregamos capas GIS estructuradas (Shapefile, GeoJSON, CSV) listas para integrar directamente en los sistemas de gestión de tu empresa.',
    icon: Layers,
  },
];

export const ComoFunciona: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const canvas3Ref = useRef<HTMLCanvasElement>(null);
  const canvasRefs = [canvas1Ref, canvas2Ref, canvas3Ref];

  const [activeStep, setActiveStep] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const activeStepRef = useRef(0);

  // Preloaded static high-efficiency WebP frames
  const imagesCacheRef = useRef<HTMLImageElement[][]>([[], [], []]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Immediate preloading of all frames on mount for 0.00s latency
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

    // Set canvas dimensions and paint frame 0 immediately with exact native aspect ratio
    canvasRefs.forEach((ref, idx) => {
      const canvas = ref.current;
      if (canvas) {
        // Step 1 native ratio is 960x717 (~4:3), Steps 2 & 3 are 960x540 (16:9)
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

  // Silky 60-120 FPS requestAnimationFrame render loop
  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    let lastRenderedFrame = -1;
    let lastStep = -1;

    const renderLoop = () => {
      // Smooth lerp damping for buttery responsive scroll feel
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
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(stepProgress * (TOTAL_FRAMES - 1)))
        );

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
                canvas.height = h;
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
          setProgressVal(self.progress);
        },
      });
    }, container);

    return () => {
      gsap.ticker.remove(renderLoop);
      ctx.revert();
    };
  }, []);

  return (
    <section id="como-funciona" ref={containerRef} className="relative bg-white h-[540vh]">
      {/* Sticky Fullscreen Scrollytelling Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-center py-6 md:py-10 px-4 sm:px-6 lg:px-16 overflow-hidden z-20 bg-white"
      >
        {/* Top Header Row */}
        <div className="max-w-7xl w-full mx-auto pb-6 border-b border-slate-100">
          <div className="mb-2">
            <Badge variant="primary">CÓMO FUNCIONA</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-2">
            De imágenes a información lista para usar.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-2xl">
            Un proceso simple, definido según los activos y datos que necesitas relevar.
          </p>
        </div>

        {/* Center Main Area: 40% Copy + 60% Seamless Feathered Animation */}
        <div className="max-w-7xl w-full mx-auto flex-1 flex items-center py-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT 40% (lg:col-span-5): Step Indicator + Exact Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Step Progress Track */}
              <div className="flex items-center gap-3 mb-8 select-none">
                {steps.map((s, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = activeStep > idx;
                  return (
                    <React.Fragment key={s.num}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? 'bg-[#3CB4A3] text-white ring-4 ring-[#3CB4A3]/20 scale-110 shadow-sm'
                              : isPast
                              ? 'bg-[#4F56A1] text-white'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {s.num}
                        </div>
                      </div>

                      {/* Connecting Line between step pills */}
                      {idx < steps.length - 1 && (
                        <div className="flex-1 h-0.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] transition-all duration-300"
                            style={{
                              width:
                                activeStep > idx
                                  ? '100%'
                                  : activeStep === idx
                                  ? `${Math.min(100, Math.max(0, ((progressVal - idx * 0.33) / 0.33) * 100))}%`
                                  : '0%',
                            }}
                          ></div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Dynamic Step Text Stack */}
              <div className="relative min-h-[170px] sm:min-h-[200px] flex items-center">
                {steps.map((step, idx) => {
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={step.num}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-400 transform ${
                        isCurrent
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : activeStep > idx
                          ? 'opacity-0 -translate-y-6 pointer-events-none'
                          : 'opacity-0 translate-y-6 pointer-events-none'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#4F56A1] mb-2 block">
                        {step.badge}
                      </span>

                      <h3 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight mb-3">
                        {step.title}
                      </h3>

                      <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT 60% (lg:col-span-7): Zero-latency 120 FPS Canvas Sequence */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <div className="relative w-full aspect-video max-h-[520px] lg:max-h-[580px] flex items-center justify-center bg-transparent organic-video-mask overflow-hidden">
                
                {/* Step 1 Canvas */}
                <canvas
                  ref={canvas1Ref}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.05] lg:scale-[1.10] organic-video-mask-step1 mix-blend-multiply brightness-[1.01] contrast-[1.02] transition-opacity duration-300 pointer-events-none ${
                    activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />

                {/* Step 2 Canvas */}
                <canvas
                  ref={canvas2Ref}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-300 pointer-events-none ${
                    activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />

                {/* Step 3 Canvas */}
                <canvas
                  ref={canvas3Ref}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-300 pointer-events-none ${
                    activeStep === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default ComoFunciona;
