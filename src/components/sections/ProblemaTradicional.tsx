import React, { useEffect, useRef } from 'react';
import {
  ShieldAlert,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingDown,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProblemaTradicional: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const graphicContainerRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  // Exact coordinates on the road surface of the 1510 x 370 PNG:
  const ROAD_UP_Y_PERCENT = 44.0;
  const ROAD_DOWN_Y_PERCENT = 49.0;

  // Cards 1 & 2 broadened slightly for optimal text flow and minimal line breaks
  const items = [
    {
      id: 1,
      icon: ShieldAlert,
      text: t.problemaTradicional.card1,
      xPercent: 9.0,
      isAlternatedDown: false,
      cardMaxWidth: 'whitespace-nowrap',
    },
    {
      id: 2,
      icon: AlertCircle,
      text: t.problemaTradicional.card2,
      xPercent: 27.5,
      isAlternatedDown: true, // Drops DOWN on intermediate screens (< xl)
      cardMaxWidth: 'whitespace-pre-line min-w-max',
    },
    {
      id: 3,
      icon: Clock,
      text: t.problemaTradicional.card3,
      xPercent: 48.0,
      isAlternatedDown: false,
      cardMaxWidth: 'whitespace-nowrap',
    },
    {
      id: 4,
      icon: DollarSign,
      text: t.problemaTradicional.card4,
      xPercent: 68.0,
      isAlternatedDown: true, // Drops DOWN on intermediate screens (< xl)
      cardMaxWidth: 'whitespace-nowrap',
    },
    {
      id: 5,
      icon: TrendingDown,
      text: t.problemaTradicional.card5,
      xPercent: 85.5,
      isAlternatedDown: false,
      cardMaxWidth: 'whitespace-nowrap',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. DESKTOP/TABLET TIMELINE (Total duration: 2.0s)
      const tl = gsap.timeline({
        paused: true,
      });

      // Step 1: PNG street image reveals first (0s -> 0.6s)
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { opacity: 0, y: 14, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
          0
        );
      }

      // Step 2: 5 items reveal sequentially from 1 to 5 as complete groups
      // Starts at 0.55s, each takes 0.45s, staggered by 0.25s:
      // Item 1: 0.55s -> 1.00s
      // Item 2: 0.80s -> 1.25s
      // Item 3: 1.05s -> 1.50s
      // Item 4: 1.30s -> 1.75s
      // Item 5: 1.55s -> 2.00s (Total = exactly 2.0s)
      [1, 2, 3, 4, 5].forEach((num, index) => {
        const callouts = graphicContainerRef.current?.querySelectorAll(
          `.survey-callout-group-${num}`
        );
        if (callouts && callouts.length > 0) {
          tl.fromTo(
            callouts,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            0.55 + index * 0.25
          );
        }
      });

      // Triggers every time scrolling reveals this section
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
      });

      // 2. MOBILE VIEW TIMELINE (Smooth stagger on mobile, repeats on scroll reveal)
      const mobileCards = mobileListRef.current?.children;
      if (mobileCards && mobileCards.length > 0) {
        const mobileTl = gsap.timeline({ paused: true });
        mobileTl.fromTo(
          mobileCards,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
          }
        );

        ScrollTrigger.create({
          trigger: mobileListRef.current,
          start: 'top 85%',
          onEnter: () => mobileTl.restart(),
          onEnterBack: () => mobileTl.restart(),
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problema-tradicional"
      ref={sectionRef}
      className="py-10 md:py-14 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden relative"
    >
      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Balanced breathing room to the visual block below */}
        <div data-reveal="fade-up" className="w-full text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#4F5051] tracking-tight leading-tight max-w-4xl mx-auto">
            {t.problemaTradicional.title}
          </h2>
        </div>

        {/* Keyframe animation for subtle road pulse */}
        <style>{`
          @keyframes roadPulseHalo {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.85;
            }
            100% {
              transform: translate(-50%, -50%) scale(2.1);
              opacity: 0;
            }
          }
          .road-pulse-halo {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            border-radius: 9999px;
            background-color: #3CB4A3;
            animation: roadPulseHalo 2s ease-out infinite;
            pointer-events: none;
          }
        `}</style>

        {/* DESKTOP & TABLET: Image Container as Coordinate System */}
        <div
          ref={graphicContainerRef}
          className="hidden md:block relative w-full select-none pt-20 sm:pt-24 pb-16 sm:pb-20"
        >
          {/* Coordinate Wrapper: width 100%, height driven naturally by the image */}
          <div className="relative w-full">
            {/* Base 3D Street Image: Clean, unobscured */}
            <img
              ref={bgImageRef}
              src="./Assets/img/2/problem.png"
              alt="Relevamiento tradicional en vía pública"
              className="w-full h-auto block object-contain pointer-events-none"
              loading="lazy"
            />

            {/* 5 Superimposed Callout Groups */}
            {items.map((item) => {
              const IconComp = item.icon;

              // Items 1, 3, 5 ALWAYS point UP (outside the image, line passing behind the icon circle)
              if (!item.isAlternatedDown) {
                return (
                  <div
                    key={item.id}
                    className={`survey-callout-group-${item.id} absolute z-20 group`}
                    style={{
                      left: `${item.xPercent}%`,
                      top: '-36px', // 36px above the top of the image (100% outside the PNG)
                      bottom: `${100 - ROAD_UP_Y_PERCENT}%`, // Origin anchored directly on the road
                    }}
                  >
                    {/* Road Origin Point on the street */}
                    <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <span className="road-pulse-halo" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3CB4A3] ring-2 ring-white z-10 block shadow-sm" />
                      </div>
                    </div>

                    {/* Vertical Line: passes from the road and runs UP behind the center of the icon circle */}
                    <div className="absolute w-[2px] bg-[#3CB4A3] left-0 top-0 bottom-0 -translate-x-1/2 z-10" />

                    {/* Top Capsule + Card: Icon in front (z-20) with solid white background, covering the line behind it */}
                    <div
                      className="absolute left-0 top-0 -translate-x-[20px] -translate-y-1/2 flex items-center gap-2.5 sm:gap-3 z-20"
                    >
                      {/* Icon Capsule: Solid white background in front of the line */}
                      <div className="relative shrink-0 w-10 h-10 rounded-full bg-white border border-[#3CB4A3]/35 shadow-[0_4px_16px_rgba(60,180,163,0.22)] flex items-center justify-center text-[#3CB4A3] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(60,180,163,0.32)] transition-all duration-300">
                        <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                      </div>

                      {/* Wide Card with natural text breathing room */}
                      <div
                        className={`bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-md group-hover:shadow-lg transition-all duration-300 ${item.cardMaxWidth}`}
                      >
                        <p className={`text-[13.5px] sm:text-[14px] xl:text-[15px] font-semibold text-[#4F5051] leading-snug ${item.id === 2 ? 'whitespace-pre-line' : 'whitespace-nowrap'}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              // --- ITEMS 2 & 4: ADAPTIVE (DOWN on < xl, UP on xl+) ---
              return (
                <React.Fragment key={item.id}>
                  {/* VERSION A: Desktop Grande (xl+), points UP outside the image */}
                  <div
                    className={`survey-callout-group-${item.id} hidden xl:block absolute z-20 group`}
                    style={{
                      left: `${item.xPercent}%`,
                      top: '-36px',
                      bottom: `${100 - ROAD_UP_Y_PERCENT}%`,
                    }}
                  >
                    {/* Road Origin Point */}
                    <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <span className="road-pulse-halo" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3CB4A3] ring-2 ring-white z-10 block shadow-sm" />
                      </div>
                    </div>

                    {/* Vertical Line: runs up behind the icon circle */}
                    <div className="absolute w-[2px] bg-[#3CB4A3] left-0 top-0 bottom-0 -translate-x-1/2 z-10" />

                    {/* Top Capsule + Card: Icon circle in front at z-20 */}
                    <div
                      className="absolute left-0 top-0 -translate-x-[20px] -translate-y-1/2 flex items-center gap-2.5 sm:gap-3 z-20"
                    >
                      <div className="relative shrink-0 w-10 h-10 rounded-full bg-white border border-[#3CB4A3]/35 shadow-[0_4px_16px_rgba(60,180,163,0.22)] flex items-center justify-center text-[#3CB4A3] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(60,180,163,0.32)] transition-all duration-300">
                        <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                      </div>

                      <div
                        className={`bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-md group-hover:shadow-lg transition-all duration-300 ${item.cardMaxWidth}`}
                      >
                        <p className={`text-[13.5px] sm:text-[14px] xl:text-[15px] font-semibold text-[#4F5051] leading-snug ${item.id === 2 ? 'whitespace-pre-line' : 'whitespace-nowrap'}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* VERSION B: Tablet / Intermediate (< xl), points DOWN outside the image */}
                  <div
                    className={`survey-callout-group-${item.id} block xl:hidden absolute z-20 group`}
                    style={{
                      left: `${item.xPercent}%`,
                      top: `${ROAD_DOWN_Y_PERCENT}%`,
                      bottom: '-36px', // 36px below the bottom of the image
                    }}
                  >
                    {/* Road Origin Point on the street */}
                    <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <span className="road-pulse-halo" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3CB4A3] ring-2 ring-white z-10 block shadow-sm" />
                      </div>
                    </div>

                    {/* Vertical Line: leaves the road and extends DOWN behind the icon circle */}
                    <div className="absolute w-[2px] bg-[#3CB4A3] left-0 top-0 bottom-0 -translate-x-1/2 z-10" />

                    {/* Bottom Capsule + Card: Icon circle in front at z-20 */}
                    <div
                      className="absolute left-0 bottom-0 -translate-x-[20px] translate-y-1/2 flex items-center gap-2.5 sm:gap-3 z-20"
                    >
                      <div className="relative shrink-0 w-10 h-10 rounded-full bg-white border border-[#3CB4A3]/35 shadow-[0_4px_16px_rgba(60,180,163,0.22)] flex items-center justify-center text-[#3CB4A3] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(60,180,163,0.32)] transition-all duration-300">
                        <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                      </div>

                      <div
                        className={`bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-md group-hover:shadow-lg transition-all duration-300 ${item.cardMaxWidth}`}
                      >
                        <p className={`text-[13.5px] sm:text-[14px] xl:text-[15px] font-semibold text-[#4F5051] leading-snug ${item.id === 2 ? 'whitespace-pre-line' : 'whitespace-nowrap'}`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* MOBILE VIEW (< md): Clean vertical list of cards with icons */}
        <div
          ref={mobileListRef}
          className="flex flex-col gap-3 md:hidden max-w-md mx-auto mt-4"
        >
          {items.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={`mobile-${item.id}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              >
                {/* White circular badge with Aimapping green subtle border & soft glow */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-[#3CB4A3]/35 shadow-[0_2px_12px_rgba(60,180,163,0.18)] flex items-center justify-center text-[#3CB4A3]">
                  <IconComp className="w-5 h-5 stroke-[2.2]" />
                </div>
                {/* Text */}
                <p className={`text-sm sm:text-base font-semibold text-[#4F5051] leading-snug ${item.id === 2 ? 'whitespace-pre-line' : 'whitespace-nowrap'}`}>
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemaTradicional;
