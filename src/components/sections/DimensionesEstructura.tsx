import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '../ui/Badge';
import { MapPin, Layers, Sliders, Camera } from 'lucide-react';

interface DimensionItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  imageSrc: string;
}

const dimensions: DimensionItem[] = [
  {
    id: 'ubicacion',
    num: '01',
    title: 'Ubicación',
    subtitle: 'Referencia geográfica del activo relevado.',
    icon: MapPin,
    imageSrc: './Assets/img/6/infraestructura-vial.png',
  },
  {
    id: 'tipo-activo',
    num: '02',
    title: 'Tipo de activo',
    subtitle: 'Clasificación de los elementos definidos.',
    icon: Layers,
    imageSrc: './Assets/img/6/energia-y-servicios-publicos.png',
  },
  {
    id: 'atributos',
    num: '03',
    title: 'Atributos',
    subtitle: 'Datos asociados según la necesidad de la organización.',
    icon: Sliders,
    imageSrc: './Assets/img/6/telecomunicaciones.png',
  },
  {
    id: 'imagen-asociada',
    num: '04',
    title: 'Imagen asociada',
    subtitle: 'Registro visual vinculado al activo cuando corresponda.',
    icon: Camera,
    imageSrc: './Assets/img/6/gobiernos-y-municipios.png',
  },
];

const STEP_DURATION_MS = 4000; // 4 seconds per dimension

export const DimensionesEstructura: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isTransitioningImage, setIsTransitioningImage] = useState<boolean>(false);

  const activeIndexRef = useRef<number>(0);
  activeIndexRef.current = activeIndex;

  const startTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Function to switch to a specific index and restart the 4s progress cycle
  const selectIndex = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = performance.now();
    
    // Trigger smooth crossfade transition for the right image panel
    setIsTransitioningImage(true);
    setTimeout(() => {
      setIsTransitioningImage(false);
    }, 450);
  };

  useEffect(() => {
    startTimeRef.current = performance.now();

    const updateLoop = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const currentPct = Math.min((elapsed / STEP_DURATION_MS) * 100, 100);

      setProgress(currentPct);

      if (elapsed >= STEP_DURATION_MS) {
        // Automatically proceed to the next item in continuous loop
        const nextIndex = (activeIndexRef.current + 1) % dimensions.length;
        selectIndex(nextIndex);
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleItemClick = (index: number) => {
    if (index === activeIndex) return;
    selectIndex(index);
  };

  const currentItem = dimensions[activeIndex];

  return (
    <section
      id="dimensiones-estructura"
      className="py-20 md:py-28 bg-[#0B0F19] text-white relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background GIS Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Column (40-45%) + Right Column (55-60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Interactive 4 Dimensions List ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Header: QUÉ RECIBES */}
            <div className="mb-3">
              <Badge variant="primary">QUÉ RECIBES</Badge>
            </div>

            {/* Title: Información lista para integrarse a tu trabajo. */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Información lista para integrarse a tu trabajo.
            </h2>

            {/* Intro: Activos identificados y georreferenciados, organizados para tus procesos y herramientas. */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8">
              Activos identificados y georreferenciados, organizados para tus procesos y herramientas.
            </p>

            {/* 4 Interactive Accordion / Timeline Items */}
            <div className="flex flex-col gap-2">
              {dimensions.map((item, idx) => {
                const isActive = activeIndex === idx;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(idx)}
                    className={`group relative rounded-xl transition-all duration-400 cursor-pointer overflow-hidden border ${
                      isActive
                        ? 'bg-white/[0.04] border-white/10 shadow-lg shadow-black/40'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    {/* Main Row Content */}
                    <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        {/* Number Prefix (01, 02, 03, 04) */}
                        <span
                          className={`font-mono text-sm sm:text-base font-semibold transition-colors duration-300 select-none pt-0.5 ${
                            isActive ? 'text-[#3CB4A3]' : 'text-slate-500 group-hover:text-slate-400'
                          }`}
                        >
                          {item.num}
                        </span>

                        {/* Title & Subtitle */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                              isActive
                                ? 'text-white'
                                : 'text-slate-400 group-hover:text-slate-300'
                            }`}
                          >
                            {item.title}
                          </h3>

                          {/* Subtitle: Only visible when active with smooth opacity & slide */}
                          <div
                            className={`grid transition-all duration-400 ease-out overflow-hidden ${
                              isActive
                                ? 'grid-rows-[1fr] opacity-100 mt-1.5'
                                : 'grid-rows-[0fr] opacity-0 mt-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Icon on the Right Edge with subtle glow when active */}
                      <div className="relative shrink-0 flex items-center justify-center pt-0.5">
                        {isActive && (
                          <div className="absolute inset-0 w-7 h-7 -top-0.5 -left-0.5 bg-[#3CB4A3]/25 rounded-full blur-md animate-pulse pointer-events-none" />
                        )}
                        <Icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 relative z-10 ${
                            isActive
                              ? 'text-[#3CB4A3] drop-shadow-[0_0_8px_rgba(60,180,163,0.5)]'
                              : 'text-slate-500 group-hover:text-slate-400'
                          }`}
                          strokeWidth={1.75}
                        />
                      </div>

                    </div>

                    {/* Progress Bar Track */}
                    {isActive ? (
                      <div className="relative w-full h-[2px] bg-white/10">
                        {/* Background continuous line with subtle natural glow across body */}
                        <div
                          className="h-full bg-gradient-to-r from-[#3CB4A3]/40 via-[#3CB4A3] to-[#3CB4A3]"
                          style={{
                            width: `${progress}%`,
                            boxShadow: '0 0 8px rgba(60, 180, 163, 0.4)',
                          }}
                        />

                        {/* Front Laser Head / Leading Glow Signal */}
                        {progress > 0 && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-[3px] pointer-events-none"
                            style={{
                              left: `${progress}%`,
                              transform: 'translate(-100%, -50%)',
                              width: '28px',
                              background: 'linear-gradient(90deg, rgba(60,180,163,0) 0%, rgba(94,234,212,0.8) 60%, #ffffff 100%)',
                              boxShadow: '0 0 10px #5eead4, 0 0 18px rgba(60,180,163,0.9), 0 0 25px rgba(60,180,163,0.5)',
                              borderRadius: '2px',
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      /* Sutil bottom divider for inactive rows */
                      <div className="w-full h-[1px] bg-white/[0.04]" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>


          {/* ================= RIGHT COLUMN: Clean Full Image Panel (No Overlays / No Fake Texts) ================= */}
          <div className="lg:col-span-7 w-full flex items-center justify-center">
            
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl shadow-black/80 flex items-center justify-center">
              
              {/* Clean Image with elegant crossfade & subtle scale transition */}
              <img
                key={currentItem.id}
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className={`w-full h-full object-cover rounded-2xl transition-all duration-500 ease-out ${
                  isTransitioningImage
                    ? 'opacity-40 scale-[1.015]'
                    : 'opacity-100 scale-100'
                }`}
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default DimensionesEstructura;
