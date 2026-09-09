import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
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
  videoSrc: string;
}

const steps: StepData[] = [
  {
    num: '01',
    badge: 'CAPTURA',
    title: 'Recorrido y captura en terreno',
    description:
      'Registramos imágenes georreferenciadas de la infraestructura mediante cámaras montadas en vehículos, asegurando cobertura completa del área.',
    icon: Camera,
    videoSrc: '/Assets/Vids/video1.mp4',
  },
  {
    num: '02',
    badge: 'PROCESAMIENTO',
    title: 'Detección e inteligencia artificial',
    description:
      'Nuestros modelos de visión computacional identifican, clasifican y extraen los atributos de cada activo visible en las capturas de forma automática.',
    icon: Cpu,
    videoSrc: '/Assets/Vids/video2.mp4',
  },
  {
    num: '03',
    badge: 'ENTREGA',
    title: 'Información georreferenciada lista para usar',
    description:
      'Entregamos capas GIS estructuradas (Shapefile, GeoJSON, CSV) listas para integrar directamente en los sistemas de gestión de tu empresa.',
    icon: Layers,
    videoSrc: '/Assets/Vids/video3.mp4',
  },
];

export const ComoFunciona: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const videoRefs = [video1Ref, video2Ref, video3Ref];

  const [activeStep, setActiveStep] = useState(0);
  const [progressVal, setProgressVal] = useState(0);
  const activeStepRef = useRef(0);
  const targetTimesRef = useRef<number[]>([0, 0, 0]);

  // Handle seeked event to apply the latest queued scroll position without decoder lockup
  const handleSeeked = (idx: number) => {
    const vid = videoRefs[idx].current;
    if (!vid) return;
    const target = targetTimesRef.current[idx];
    if (Math.abs(vid.currentTime - target) > 0.02 && !vid.seeking) {
      vid.currentTime = target;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Preload videos and ensure they stay strictly paused (scroll-only scrubbing)
    videoRefs.forEach((ref) => {
      const vid = ref.current;
      if (vid) {
        vid.pause();
        vid.preload = 'auto';
        vid.currentTime = 0.01;
      }
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgressVal(p);

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

          // Non-blocking seek queue for instantaneous frame update on scroll
          const vid = videoRefs[stepIdx].current;
          if (vid && vid.duration && !Number.isNaN(vid.duration)) {
            const target = Math.min(
              vid.duration - 0.02,
              Math.max(0.01, vid.duration * stepProgress)
            );
            targetTimesRef.current[stepIdx] = target;

            if (!vid.seeking) {
              if (Math.abs(vid.currentTime - target) > 0.02) {
                vid.currentTime = target;
              }
            }
          }
        },
      });
    }, container);

    return () => {
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

        {/* Center Main Area: 40% Copy + 60% Seamless Feathered Video */}
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

            {/* RIGHT 60% (lg:col-span-7): Seamless Borderless Organic Video Integration */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              <div className="relative w-full aspect-video max-h-[520px] lg:max-h-[580px] flex items-center justify-center bg-transparent organic-video-mask overflow-hidden">
                {/* Video 1 */}
                <video
                  ref={video1Ref}
                  src="/Assets/Vids/video1.mp4"
                  preload="auto"
                  muted
                  playsInline
                  onSeeked={() => handleSeeked(0)}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.12] lg:scale-[1.18] organic-video-mask mix-blend-multiply brightness-[1.01] contrast-[1.02] transition-opacity duration-500 ease-out ${
                    activeStep === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />

                {/* Video 2 */}
                <video
                  ref={video2Ref}
                  src="/Assets/Vids/video2.mp4"
                  preload="auto"
                  muted
                  playsInline
                  onSeeked={() => handleSeeked(1)}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-500 ease-out ${
                    activeStep === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />

                {/* Video 3 */}
                <video
                  ref={video3Ref}
                  src="/Assets/Vids/video3.mp4"
                  preload="auto"
                  muted
                  playsInline
                  onSeeked={() => handleSeeked(2)}
                  className={`absolute inset-0 w-full h-full object-contain scale-[1.08] lg:scale-[1.14] organic-video-mask mix-blend-multiply brightness-[1.04] contrast-[1.06] saturate-[1.04] transition-opacity duration-500 ease-out ${
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
