import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Layers, Camera } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const availableFormats = [
  { name: 'GeoJSON', ext: '.geojson' },
  { name: 'Shapefile', ext: '.shp' },
  { name: 'DXF', ext: '.dxf' },
  { name: 'DWG', ext: '.dwg' },
  { name: 'ArcGIS', ext: '.gdb' },
  { name: 'CSV', ext: '.csv' },
];

const STEP_DURATION_MS = 4000;

export const QueRecibes: React.FC = () => {
  const { t } = useLanguage();

  const dimensions = [
    {
      id: 'ubicacion',
      title: t.queRecibes.dim1Title,
      subtitle: t.queRecibes.dim1Subtitle,
      icon: MapPin,
      imageSrc: './Assets/img/6/1a.jpg',
    },
    {
      id: 'tipo-activo',
      title: t.queRecibes.dim2Title,
      subtitle: t.queRecibes.dim2Subtitle,
      icon: Layers,
      imageSrc: './Assets/img/6/2a.jpg',
    },
    {
      id: 'imagen-asociada',
      title: t.queRecibes.dim3Title,
      subtitle: t.queRecibes.dim3Subtitle,
      icon: Camera,
      imageSrc: './Assets/img/6/3a.jpg',
    },
  ];

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
        // Automatically proceed to the next item in continuous loop of 3
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
      id="que-recibes"
      className="py-20 md:py-28 bg-[#F8FAFC] text-[#4F5051] relative overflow-hidden border-t border-slate-200 gis-grid-pattern"
    >
      {/* Ambient background glow accents in light mode */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#3CB4A3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#4F56A1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= TOP SECTION: Header & 2 Columns (Interactive Dimensions + Image) ================= */}
        <div data-reveal="fade-up" className="mb-14">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#4F5051] tracking-tight leading-tight mb-3">
            {t.queRecibes.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {t.queRecibes.subtitle}
          </p>
        </div>

        {/* Row 1: Left 3-item Accordion (40-45%) + Right Clean Image (55-60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* LEFT: 3 Interactive Items (01 Ubicación, 02 Tipo de activo, 03 Imagen asociada) */}
          <div data-reveal="fade-right" className="lg:col-span-5 flex flex-col gap-3">
            {dimensions.map((item, idx) => {
              const isActive = activeIndex === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(idx)}
                  className={`group relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isActive
                      ? 'bg-white border-[#3CB4A3]/40 shadow-lg shadow-slate-200/80'
                      : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Main Row Content */}
                  <div className="p-5 flex items-start justify-between gap-4">
                    
                    <div className="flex-1 min-w-0">
                      {/* Title & Subtitle */}
                      <h3
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                          isActive
                            ? 'text-slate-900'
                            : 'text-slate-600 group-hover:text-slate-800'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Subtitle: Visible when active */}
                      <div
                        className={`grid transition-all duration-400 ease-out overflow-hidden ${
                          isActive
                            ? 'grid-rows-[1fr] opacity-100 mt-1.5'
                            : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Icon on the Right Edge with subtle glow when active */}
                    <div className="relative shrink-0 flex items-center justify-center pt-0.5">
                      {isActive && (
                        <div className="absolute inset-0 w-8 h-8 -top-1 -left-1 bg-[#3CB4A3]/20 rounded-full blur-md animate-pulse pointer-events-none" />
                      )}
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 relative z-10 ${
                          isActive
                            ? 'text-[#3CB4A3] drop-shadow-[0_0_6px_rgba(60,180,163,0.6)]'
                            : 'text-slate-400 group-hover:text-slate-500'
                        }`}
                        strokeWidth={1.75}
                      />
                    </div>

                  </div>

                  {/* Progress Bar Track: Light Mode with laser tip */}
                  {isActive ? (
                    <div className="relative w-full h-[2.5px] bg-slate-100 overflow-visible">
                      {/* Body of the line */}
                      <div
                        className="h-full bg-[#3CB4A3]"
                        style={{
                          width: `${progress}%`,
                          boxShadow: '0 0 6px rgba(60, 180, 163, 0.4)',
                        }}
                      />

                      {/* Laser tip / glowing signal head */}
                      {progress > 0 && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-[3.5px] pointer-events-none"
                          style={{
                            left: `${progress}%`,
                            transform: 'translate(-100%, -50%)',
                            width: '28px',
                            background: 'linear-gradient(90deg, rgba(60,180,163,0) 0%, rgba(94,234,212,0.9) 50%, #ffffff 100%)',
                            boxShadow: '0 0 8px #3CB4A3, 0 0 14px rgba(60,180,163,0.8)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    /* Sutil divider for inactive items */
                    <div className="w-full h-[1px] bg-slate-100" />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Large Clean Image (No text overlays) */}
          <div data-reveal="fade-left" className="delay-150 lg:col-span-7 w-full flex items-center justify-center">
            <div className="relative w-full aspect-[1563/1006] rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xl shadow-slate-200/70 flex items-center justify-center">
              <img
                key={currentItem.id}
                src={currentItem.imageSrc}
                alt={`Entregable GIS de activos georreferenciados - ${currentItem.title}: ${currentItem.subtitle}`}
                className={`w-full h-full object-cover rounded-2xl transition-all duration-500 ease-out ${
                  isTransitioningImage ? 'opacity-40 scale-[1.01]' : 'opacity-100 scale-100'
                }`}
              />
            </div>
          </div>

        </div>

        {/* ================= ROW 2: Clean Non-Interactive Formats List ================= */}
        <div data-reveal="fade-up" className="delay-200 w-full pt-4 border-t border-slate-200/80">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mr-1">
              {t.queRecibes.compatibleFormats}
            </span>
            {availableFormats.map((fmt, i) => (
              <div
                key={fmt.name}
                data-reveal="fade-up"
                style={{ '--reveal-delay': `${250 + i * 50}ms` } as React.CSSProperties}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-700 shadow-sm"
              >
                <span className="text-xs font-bold text-[#4F5051]">{fmt.name}</span>
                <span className="text-[11px] font-mono text-slate-400 font-medium">{fmt.ext}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default QueRecibes;
