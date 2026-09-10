import React, { useState, useEffect, useRef } from 'react';
import {
  MapPinCheck,
  Clock,
  CircleDollarSign,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CarouselItem {
  id: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number | string }>;
  title: string;
  subtitle: string;
  brandColor: string;
  ringColor: string;
  bgSoft: string;
}

export const SemicircleCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const items: CarouselItem[] = [
    {
      id: 1,
      icon: MapPinCheck,
      title: t.puntoPartida.node1Title,
      subtitle: t.puntoPartida.node1Desc,
      brandColor: '#3CB4A3', // AiMapping Turquoise
      ringColor: 'rgba(60, 180, 163, 0.25)',
      bgSoft: 'rgba(60, 180, 163, 0.12)',
    },
    {
      id: 2,
      icon: Clock,
      title: t.puntoPartida.node2Title,
      subtitle: t.puntoPartida.node2Desc,
      brandColor: '#4F56A1', // AiMapping Indigo
      ringColor: 'rgba(79, 86, 161, 0.25)',
      bgSoft: 'rgba(79, 86, 161, 0.12)',
    },
    {
      id: 3,
      icon: CircleDollarSign,
      title: t.puntoPartida.node3Title,
      subtitle: t.puntoPartida.node3Desc,
      brandColor: '#E15B64', // Warm brand Coral
      ringColor: 'rgba(225, 91, 100, 0.25)',
      bgSoft: 'rgba(225, 91, 100, 0.12)',
    },
  ];

  const total = items.length;

  const activeStepRef = useRef(0);
  activeStepRef.current = activeStep;
  const pathRef = useRef<SVGPathElement>(null);

  // Auto-advance loop every 3.8s with ~1050ms transition
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1050; // Smooth 1050ms motion

    function easeInOutCubic(x: number): number {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    const interval = setInterval(() => {
      const fromStep = activeStepRef.current;
      const toStep = (fromStep + 1) % total;
      setIsTransitioning(true);
      startTime = null;

      const stepAnimation = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRaw = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progressRaw);

        setAnimProgress(fromStep + eased);

        if (progressRaw < 1) {
          animationFrameId = requestAnimationFrame(stepAnimation);
        } else {
          setActiveStep(toStep);
          setAnimProgress(toStep);
          setIsTransitioning(false);
        }
      };

      animationFrameId = requestAnimationFrame(stepAnimation);
    }, 3800);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [total]);

  // Function to evaluate exact point on the SVG path directly via getPointAtLength!
  const getNodePosition = (slotPos: number) => {
    const path = pathRef.current;
    if (!path) {
      // Fallback approximation while mounting
      const t = Math.max(0, Math.min(4, slotPos)) / 4;
      return { xPercent: 10 + t * 80, yPercent: 80 - Math.sin(t * Math.PI) * 55 };
    }

    const totalLength = path.getTotalLength();
    // slotPos ranges from 0 (entry left) to 4 (exit right)
    // Left slot (1): 25% of path length
    // Center Apex (2): 50% of path length (Apex of semicircle!)
    // Right slot (3): 75% of path length
    const t = Math.max(0, Math.min(4, slotPos)) / 4;
    const lengthAlongPath = t * totalLength;
    const pt = path.getPointAtLength(lengthAlongPath);

    // Path viewBox is 0 0 900 200
    const xPercent = (pt.x / 900) * 100;
    const yPercent = (pt.y / 200) * 100;

    return { xPercent, yPercent };
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 select-none flex flex-col items-center">
      {/* 1. Curve Container with Exact Reference SVG */}
      <div className="relative w-full aspect-[900/200] max-h-[220px]">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 900 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* AiMapping Brand Gradient: Verde (#3CB4A3) -> Violeta (#4F56A1) -> Coral (#E15B64) */}
            <linearGradient id="semicircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3CB4A3" stopOpacity="0.12" />
              <stop offset="18%" stopColor="#3CB4A3" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4F56A1" stopOpacity="0.85" />
              <stop offset="82%" stopColor="#E15B64" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E15B64" stopOpacity="0.12" />
            </linearGradient>

            <filter id="arcShadow" x="-5%" y="-30%" width="110%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#4F56A1" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background ambient stroke blur */}
          <path
            d="M 50 170 C 240 25, 660 25, 850 170"
            stroke="url(#semicircleGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            className="opacity-25 blur-sm"
          />

          {/* Main crisp curved arc - referenced for exact getPointAtLength! */}
          <path
            ref={pathRef}
            d="M 50 170 C 240 25, 660 25, 850 170"
            stroke="url(#semicircleGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#arcShadow)"
          />
        </svg>

        {/* 2. NODES: Render 3 items centered directly ON the SVG curve */}
        {items.map((item, index) => {
          let offset = (index - animProgress) % total;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const slotPos = offset + 2;

          if (slotPos < -0.2 || slotPos > 4.2) {
            return null;
          }

          const { xPercent, yPercent } = getNodePosition(slotPos);

          const distToApex = Math.abs(slotPos - 2);
          const isApexActive = distToApex < 0.25;

          // Scale: Center is 1.15 on desktop, sides are 0.92, outer is 0.65
          const scale = Math.max(0.65, 1.15 - distToApex * 0.22);

          // Opacity: Center & sides visible; smooth fade when sliding outside
          let opacity = 0;
          if (distToApex <= 1.1) {
            opacity = 1;
          } else if (distToApex < 1.6) {
            opacity = Math.max(0, 1 - (distToApex - 1.1) / 0.5);
          }

          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="absolute pointer-events-none will-change-transform"
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                opacity: opacity,
                transform: `translate(-50%, -50%) scale(${scale})`,
                zIndex: isApexActive ? 30 : 10,
                transition: isTransitioning
                  ? 'none'
                  : 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Active Ripple / Pulse around center apex node */}
                {isApexActive && (
                  <>
                    <span
                      className="absolute w-16 h-16 sm:w-28 sm:h-28 rounded-full animate-ping opacity-35 pointer-events-none"
                      style={{ backgroundColor: item.bgSoft }}
                    />
                    <span
                      className="absolute w-14 h-14 sm:w-24 sm:h-24 rounded-full border animate-pulse pointer-events-none"
                      style={{ borderColor: item.brandColor, opacity: 0.4 }}
                    />
                    <span
                      className="absolute w-18 h-18 sm:w-32 sm:h-32 rounded-full border pointer-events-none"
                      style={{ borderColor: item.brandColor, opacity: 0.2 }}
                    />
                  </>
                )}

                {/* Outer Circular Container */}
                <div
                  className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
                    isApexActive
                      ? 'w-13 h-13 sm:w-[4.85rem] sm:h-[4.85rem]'
                      : 'w-10 h-10 sm:w-[3.85rem] sm:h-[3.85rem]'
                  }`}
                  style={{
                    backgroundColor: isApexActive ? item.bgSoft : 'rgba(248, 250, 252, 0.95)',
                    boxShadow: isApexActive
                      ? `0 8px 20px -4px ${item.brandColor}33, 0 0 0 4px ${item.ringColor}`
                      : '0 2px 8px -2px rgba(0,0,0,0.06), 0 0 0 2px rgba(226, 232, 240, 0.85)',
                  }}
                >
                  {/* Inner Icon Circle Badge */}
                  <div
                    className={`rounded-full flex items-center justify-center transition-all duration-300 bg-white ${
                      isApexActive
                        ? 'w-9.5 h-9.5 sm:w-[3.5rem] sm:h-[3.5rem] border-[1.75px] sm:border-[2.5px]'
                        : 'w-7.5 h-7.5 sm:w-[2.75rem] sm:h-[2.75rem] border-[1px] sm:border-[1.5px]'
                    }`}
                    style={{
                      borderColor: isApexActive ? item.brandColor : 'rgba(203, 213, 225, 0.9)',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                    }}
                  >
                    <IconComponent
                      className={`transition-all duration-300 ${
                        isApexActive
                          ? 'w-5 h-5 sm:w-[1.85rem] sm:h-[1.85rem]'
                          : 'w-3.5 h-3.5 sm:w-[1.35rem] sm:h-[1.35rem]'
                      }`}
                      style={{
                        color: isApexActive ? item.brandColor : '#94A3B8',
                        strokeWidth: isApexActive ? 2.2 : 1.8,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Text container immediately below the center apex: Title + Subtitle */}
      <div className="relative w-full max-w-xl mx-auto mt-3 sm:-mt-6 text-center min-h-[76px] sm:min-h-[80px] flex items-center justify-center px-4 z-20">
        {items.map((item, index) => {
          const isCurrent = index === activeStep;
          return (
            <div
              key={item.id}
              className={`absolute w-full flex flex-col items-center justify-center transition-all duration-500 ease-out ${
                isCurrent
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 translate-y-2 scale-98 pointer-events-none'
              }`}
            >
              {/* Title */}
              <h3 className="text-base sm:text-2xl font-bold text-[#4F5051] tracking-tight leading-snug mb-1 sm:mb-1.5">
                {item.title}
              </h3>
              {/* Subtitle */}
              <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-md mx-auto">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemicircleCarousel;
