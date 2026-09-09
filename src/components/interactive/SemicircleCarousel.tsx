import React, { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  Clock,
  SplitSquareVertical,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

interface CarouselItem {
  id: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number | string }>;
  text: string;
  brandColor: string;
  ringColor: string;
  bgSoft: string;
}

const ITEMS: CarouselItem[] = [
  {
    id: 1,
    icon: AlertCircle,
    text: 'Múltiples problemas/riesgos para los operarios en la vía pública',
    brandColor: '#3CB4A3', // AiMapping Turquoise
    ringColor: 'rgba(60, 180, 163, 0.25)',
    bgSoft: 'rgba(60, 180, 163, 0.12)',
  },
  {
    id: 2,
    icon: AlertTriangle,
    text: 'Recabar información manualmente es propenso a error',
    brandColor: '#4288A3', // Intermediate cyan
    ringColor: 'rgba(66, 136, 163, 0.25)',
    bgSoft: 'rgba(66, 136, 163, 0.12)',
  },
  {
    id: 3,
    icon: Clock,
    text: 'Proceso lento',
    brandColor: '#4F56A1', // AiMapping Indigo
    ringColor: 'rgba(79, 86, 161, 0.25)',
    bgSoft: 'rgba(79, 86, 161, 0.12)',
  },
  {
    id: 4,
    icon: SplitSquareVertical,
    text: 'Altos costos operativos',
    brandColor: '#E15B64', // Warm brand Coral
    ringColor: 'rgba(225, 91, 100, 0.25)',
    bgSoft: 'rgba(225, 91, 100, 0.12)',
  },
  {
    id: 5,
    icon: TrendingDown,
    text: 'Menor Productividad',
    brandColor: '#7A529B', // Deep Violet / Purple
    ringColor: 'rgba(122, 82, 155, 0.25)',
    bgSoft: 'rgba(122, 82, 155, 0.12)',
  },
];

export const SemicircleCarousel: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeStepRef = useRef(0);
  activeStepRef.current = activeStep;
  const pathRef = useRef<SVGPathElement>(null);

  // Auto-advance loop every 3.6s with ~1050ms transition
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1050; // Smooth 1050ms motion

    function easeInOutCubic(x: number): number {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    const interval = setInterval(() => {
      const fromStep = activeStepRef.current;
      const toStep = (fromStep + 1) % ITEMS.length;
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
    }, 3600);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const total = ITEMS.length;

  // Function to evaluate exact point on the SVG path directly via getPointAtLength!
  // This guarantees 100.00% precision: icons can NEVER deviate or float off the line.
  const getNodePosition = (slotPos: number) => {
    const path = pathRef.current;
    if (!path) {
      // Fallback approximation while mounting
      const t = Math.max(0, Math.min(4, slotPos)) / 4;
      return { xPercent: 10 + t * 80, yPercent: 80 - Math.sin(t * Math.PI) * 55 };
    }

    const totalLength = path.getTotalLength();
    // slotPos ranges from 0 (entry left) to 4 (exit right)
    // Left slot (1): ~17% of path length
    // Center Apex (2): 50% of path length (Apex of semicircle!)
    // Right slot (3): ~83% of path length
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

        {/* 2. NODES: Render all 5 items centered directly ON the SVG curve */}
        {ITEMS.map((item, index) => {
          let offset = (index - animProgress) % total;
          if (offset < -2.5) offset += total;
          if (offset > 2.5) offset -= total;

          const slotPos = offset + 2;

          if (slotPos < -0.2 || slotPos > 4.2) {
            return null;
          }

          const { xPercent, yPercent } = getNodePosition(slotPos);

          const distToApex = Math.abs(slotPos - 2);
          const isApexActive = distToApex < 0.25;

          // Scale: Center is 1.15, sides are 0.90, outer is 0.65
          const scale = Math.max(0.65, 1.15 - distToApex * 0.22);

          // Opacity: Center & sides visible; fade to 0 when sliding outside
          let opacity = 0;
          if (distToApex <= 1.25) {
            opacity = 1;
          } else if (distToApex < 1.85) {
            opacity = Math.max(0, 1 - (distToApex - 1.25) / 0.6);
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
                      className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full animate-ping opacity-40 pointer-events-none"
                      style={{ backgroundColor: item.bgSoft }}
                    />
                    <span
                      className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border animate-pulse pointer-events-none"
                      style={{ borderColor: item.brandColor, opacity: 0.45 }}
                    />
                    <span
                      className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border pointer-events-none"
                      style={{ borderColor: item.brandColor, opacity: 0.2 }}
                    />
                  </>
                )}

                {/* Outer Circular Container */}
                <div
                  className="relative rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: isApexActive ? '4.85rem' : '3.85rem',
                    height: isApexActive ? '4.85rem' : '3.85rem',
                    backgroundColor: isApexActive ? item.bgSoft : 'rgba(248, 250, 252, 0.95)',
                    boxShadow: isApexActive
                      ? `0 12px 28px -4px ${item.brandColor}33, 0 0 0 8px ${item.ringColor}`
                      : '0 4px 14px -2px rgba(0,0,0,0.06), 0 0 0 4px rgba(226, 232, 240, 0.85)',
                  }}
                >
                  {/* Inner Icon Circle Badge */}
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-300 bg-white"
                    style={{
                      width: isApexActive ? '3.5rem' : '2.75rem',
                      height: isApexActive ? '3.5rem' : '2.75rem',
                      borderWidth: isApexActive ? '2.5px' : '1.5px',
                      borderColor: isApexActive ? item.brandColor : 'rgba(203, 213, 225, 0.9)',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                    }}
                  >
                    <IconComponent
                      className="transition-all duration-300"
                      style={{
                        width: isApexActive ? '1.85rem' : '1.35rem',
                        height: isApexActive ? '1.85rem' : '1.35rem',
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

      {/* 3. Text container immediately below the center apex */}
      <div className="relative w-full max-w-xl mx-auto -mt-4 sm:-mt-8 text-center min-h-[52px] sm:min-h-[60px] flex items-center justify-center px-4 z-20">
        {ITEMS.map((item, index) => {
          const isCurrent = index === activeStep;
          return (
            <div
              key={item.id}
              className={`absolute w-full transition-all duration-500 ease-out flex items-center justify-center ${
                isCurrent
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 translate-y-2 scale-98 pointer-events-none'
              }`}
            >
              <h3
                className="text-base sm:text-xl font-bold tracking-tight leading-snug max-w-lg mx-auto"
                style={{ color: '#4F5051' }}
              >
                {item.text}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemicircleCarousel;
