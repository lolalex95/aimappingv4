import React from 'react';
import {
  MapPinCheck,
  Clock,
  CircleDollarSign,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SemicircleCarousel: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    {
      id: 1,
      icon: MapPinCheck,
      title: t.puntoPartida.node1Title,
      subtitle: t.puntoPartida.node1Desc,
      brandColor: '#3CB4A3', // Turquoise
      ringColor: 'rgba(60, 180, 163, 0.25)',
      bgSoft: 'rgba(60, 180, 163, 0.12)',
      // Positioned exactly on the SVG Bezier curve (at X = 20%, Y = 53.6%)
      xPercent: 20,
      yPercent: 53.6,
      textMarginClass: 'mt-0',
    },
    {
      id: 2,
      icon: Clock,
      title: t.puntoPartida.node2Title,
      subtitle: t.puntoPartida.node2Desc,
      brandColor: '#4F56A1', // Indigo
      ringColor: 'rgba(79, 86, 161, 0.25)',
      bgSoft: 'rgba(79, 86, 161, 0.12)',
      // Apex point on the SVG Bezier curve (at X = 50%, Y = 32.5%)
      xPercent: 50,
      yPercent: 32.5,
      // Middle text pulled up closer to the elevated central apex icon
      textMarginClass: 'md:-mt-8 lg:-mt-10',
    },
    {
      id: 3,
      icon: CircleDollarSign,
      title: t.puntoPartida.node3Title,
      subtitle: t.puntoPartida.node3Desc,
      brandColor: '#E15B64', // Coral
      ringColor: 'rgba(225, 91, 100, 0.25)',
      bgSoft: 'rgba(225, 91, 100, 0.12)',
      // Positioned exactly on the SVG Bezier curve (at X = 80%, Y = 53.6%)
      xPercent: 80,
      yPercent: 53.6,
      textMarginClass: 'mt-0',
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 select-none flex flex-col items-center">
      {/* 1. Curved Line SVG Container */}
      <div className="relative w-full aspect-[900/200] max-h-[220px]">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 900 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Brand Gradient: Turquoise (#3CB4A3) -> Indigo (#4F56A1) -> Coral (#E15B64) */}
            <linearGradient id="semicircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3CB4A3" stopOpacity="0.15" />
              <stop offset="18%" stopColor="#3CB4A3" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#4F56A1" stopOpacity="0.9" />
              <stop offset="82%" stopColor="#E15B64" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E15B64" stopOpacity="0.15" />
            </linearGradient>

            <filter id="arcShadow" x="-5%" y="-30%" width="110%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#4F56A1" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background ambient stroke blur */}
          <path
            d="M 60 170 C 240 30, 660 30, 840 170"
            stroke="url(#semicircleGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            className="opacity-25 blur-sm"
          />

          {/* Main crisp curved arc */}
          <path
            d="M 60 170 C 240 30, 660 30, 840 170"
            stroke="url(#semicircleGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#arcShadow)"
          />
        </svg>

        {/* 2. NODES: Render 3 items centered directly on the SVG curve line */}
        {items.map((item) => {
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.xPercent}%`,
                top: `${item.yPercent}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 15,
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Soft glow background */}
                <span
                  className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full opacity-60 pointer-events-none blur-md"
                  style={{ backgroundColor: item.bgSoft }}
                />

                {/* Outer Circular Container - Equal size for all 3 */}
                <div
                  className="relative rounded-full flex items-center justify-center transition-all duration-300 w-12 h-12 sm:w-16 sm:h-16 shadow-md"
                  style={{
                    backgroundColor: item.bgSoft,
                    boxShadow: `0 6px 16px -3px ${item.brandColor}30, 0 0 0 3px ${item.ringColor}`,
                  }}
                >
                  {/* Inner Icon Circle Badge - Equal size */}
                  <div
                    className="rounded-full flex items-center justify-center bg-white w-9 h-9 sm:w-12 sm:h-12 border-[2px] shadow-sm"
                    style={{
                      borderColor: item.brandColor,
                    }}
                  >
                    <IconComponent
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{
                        color: item.brandColor,
                        strokeWidth: 2,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Text containers for all 3 elements: Middle text pulled up closer to its elevated icon */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-3 text-center">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center px-4 transition-all ${item.textMarginClass}`}
          >
            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-[#4F5051] tracking-tight leading-snug mb-1.5">
              {item.title}
            </h3>
            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xs mx-auto">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemicircleCarousel;

