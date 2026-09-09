import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const ResultadosMedibles: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section
      id="resultados-medibles"
      className="py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Topographic Ambient Watermark Contours */}
      <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply flex items-center justify-center">
        <svg
          viewBox="0 0 1440 750"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-80 160 C 220 60, 480 340, 850 180 C 1150 50, 1340 300, 1550 200"
            stroke="#3CB4A3"
            strokeWidth="1.2"
            strokeOpacity="0.18"
          />
          <path
            d="M-80 300 C 200 200, 540 480, 910 300 C 1190 170, 1380 440, 1550 340"
            stroke="#3CB4A3"
            strokeWidth="1"
            strokeOpacity="0.12"
          />
          <path
            d="M-80 460 C 180 340, 600 600, 950 440 C 1230 310, 1420 580, 1550 480"
            stroke="#3CB4A3"
            strokeWidth="1.2"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-4">
            {isEn ? (
              <>
                Measurable results{' '}
                <span className="gradient-brand-text">from the first survey.</span>
              </>
            ) : (
              <>
                Resultados medibles{' '}
                <span className="gradient-brand-text">desde el primer relevamiento.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {isEn
              ? 'AiMapping does not just digitize. It reduces turnaround times, cuts operating expenses, and eliminates rework loops that delay decision-making.'
              : 'AiMapping no solo digitaliza. Reduce tiempos, costos operativos y elimina los ciclos de reproceso que frenan la toma de decisiones.'}
          </p>
        </div>

        {/* Diagram Architecture: 3-column layout where lines connect 100% flush into cards */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0 relative z-10">
            
            {/* LEFT COLUMN: 2 Cards (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-14">
              {/* Card 1: Top Left */}
              <div
                data-reveal="fade-right"
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3CB4A3]/40 transition-all duration-300"
              >
                <div className="font-['Exo_2',sans-serif] text-2xl sm:text-3xl font-bold text-[#3CB4A3] mb-1.5 leading-none">
                  8×
                </div>
                <p className="font-['Exo_2',sans-serif] text-sm font-semibold text-[#4F5051] leading-snug mb-1">
                  {isEn ? 'reduction in field work time.' : 'de reducción en tiempos de trabajo de campo.'}
                </p>
                <p className="font-['Exo_2',sans-serif] text-xs text-slate-500 font-normal leading-relaxed">
                  {isEn ? 'Processes that go from months to weeks.' : 'Procesos que pasan de meses a semanas.'}
                </p>
              </div>

              {/* Card 3: Bottom Left */}
              <div
                data-reveal="fade-right"
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3CB4A3]/40 transition-all duration-300"
              >
                <div className="font-['Exo_2',sans-serif] text-2xl sm:text-3xl font-bold text-[#3CB4A3] mb-1.5 leading-none">
                  {isEn ? 'Up to 40%' : 'Hasta 40%'}
                </div>
                <p className="font-['Exo_2',sans-serif] text-sm font-semibold text-[#4F5051] leading-snug mb-1">
                  {isEn ? 'reduction in operating costs.' : 'menos de costos operativos.'}
                </p>
                <p className="font-['Exo_2',sans-serif] text-xs text-slate-500 font-normal leading-relaxed">
                  {isEn ? 'Direct efficiency on the bottom line.' : 'Eficiencia directa en el balance general.'}
                </p>
              </div>
            </div>

            {/* CENTER COLUMN: Central Hub + SVG connecting lines flush into cards (lg:col-span-4) - Desktop only */}
            <div className="hidden lg:flex lg:col-span-4 relative items-center justify-center min-h-[360px] lg:min-h-[440px]">
              
              {/* SVG Connecting Lines extending 100% edge-to-edge from Card 1/3 right border (x=0) to Card 2/4 left border (x=100) */}
              <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 300 440"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="dataLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#3CB4A3" floodOpacity="0.85" />
                    </filter>
                  </defs>

                  {/* Concentric radar orbit circles around center (150, 220) */}
                  <circle
                    cx="150"
                    cy="220"
                    r="62"
                    stroke="#3CB4A3"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx="150"
                    cy="220"
                    r="82"
                    stroke="#3CB4A3"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    strokeOpacity="0.2"
                  />

                  {/* Line 1: Center Hub (150, 220) -> Left Card 1 (0, 85) */}
                  <path
                    id="wire-1"
                    d="M 150 220 C 100 220, 50 85, 0 85"
                    stroke="#3CB4A3"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />

                  {/* Line 2: Center Hub (150, 220) -> Right Card 2 (300, 85) */}
                  <path
                    id="wire-2"
                    d="M 150 220 C 200 220, 250 85, 300 85"
                    stroke="#3CB4A3"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />

                  {/* Line 3: Center Hub (150, 220) -> Left Card 3 (0, 355) */}
                  <path
                    id="wire-3"
                    d="M 150 220 C 100 220, 50 355, 0 355"
                    stroke="#3CB4A3"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />

                  {/* Line 4: Center Hub (150, 220) -> Right Card 4 (300, 355) */}
                  <path
                    id="wire-4"
                    d="M 150 220 C 200 220, 250 355, 300 355"
                    stroke="#3CB4A3"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />

                  {/* Terminal Pin Dots directly placed on the exact end of each line touching the card edge */}
                  <circle cx="0" cy="85" r="5" fill="#3CB4A3" />
                  <circle cx="300" cy="85" r="5" fill="#3CB4A3" />
                  <circle cx="0" cy="355" r="5" fill="#3CB4A3" />
                  <circle cx="300" cy="355" r="5" fill="#3CB4A3" />

                  {/* Hub Orbit Node Pins */}
                  <circle cx="88" cy="220" r="3.5" fill="#3CB4A3" />
                  <circle cx="212" cy="220" r="3.5" fill="#3CB4A3" />
                  <circle cx="150" cy="158" r="3.5" fill="#3CB4A3" />
                  <circle cx="150" cy="282" r="3.5" fill="#3CB4A3" />
                </svg>
              </div>

              {/* Central Hub with Pulse / Ripple Effects */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center z-30 select-none">
                {/* Concentric expanding ripples */}
                <span className="absolute w-40 h-40 rounded-full bg-[#3CB4A3]/10 animate-ping opacity-60" style={{ animationDuration: '3.2s' }} />
                <span className="absolute w-32 h-32 rounded-full border border-[#3CB4A3]/30 animate-pulse" style={{ animationDuration: '2.4s' }} />
                <span className="absolute w-48 h-48 rounded-full border border-[#3CB4A3]/15 animate-pulse" style={{ animationDuration: '3s' }} />

                {/* Soft ambient glow */}
                <div className="absolute inset-0 rounded-full bg-[#3CB4A3]/15 blur-xl" />

                {/* Topographic circular container */}
                <div className="relative w-36 h-36 rounded-full border border-[#3CB4A3]/25 bg-white/95 shadow-xl shadow-[#3CB4A3]/15 flex items-center justify-center">
                  <div className="w-26 h-26 rounded-full border border-[#3CB4A3]/25 bg-[#3CB4A3]/5 flex items-center justify-center p-2">
                    <div className="w-18 h-18 rounded-full border border-[#3CB4A3]/40 bg-white flex items-center justify-center shadow-sm p-3">
                      {/* Exact SVG provided by user */}
                      <svg
                        viewBox="0 0 391.99 376.4"
                        className="w-full h-full object-contain overflow-visible"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs>
                          <linearGradient
                            id="Degradado_sin_nombre_30_hub"
                            x1="203.7"
                            y1="128.14"
                            x2="203.7"
                            y2="262.31"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset=".28" stopColor="#3bb4a3" />
                            <stop offset="1" stopColor="#5058a2" />
                          </linearGradient>
                          <linearGradient
                            id="Degradado_sin_nombre_30-2_hub"
                            x1="244.35"
                            y1="231.8"
                            x2="244.35"
                            y2="231.99"
                            href="#Degradado_sin_nombre_30_hub"
                          />
                          <linearGradient
                            id="Degradado_sin_nombre_30-3_hub"
                            x1="203.7"
                            y1="25.96"
                            x2="203.7"
                            y2="340.09"
                            href="#Degradado_sin_nombre_30_hub"
                          />
                        </defs>
                        <path
                          fill="url(#Degradado_sin_nombre_30_hub)"
                          d="M225.48,222.06c17.09-8.42,27.7-25.45,27.7-44.43,0-29.12-25.28-52.44-55.04-49.18-22.64,2.48-41.01,20.69-43.6,43.32-2.44,21.28,8.54,41.02,27.38,50.29,1.86.92,3.27,2.56,4.04,4.49l13.03,32.57c1.7,4.25,7.71,4.25,9.41,0l13.03-32.56c.77-1.94,2.18-3.59,4.05-4.51ZM203.7,202.6c-14.69,0-26.6-11.91-26.6-26.6s11.91-26.6,26.6-26.6,26.6,11.91,26.6,26.6-11.91,26.6-26.6,26.6Z"
                        />
                        <path
                          fill="url(#Degradado_sin_nombre_30-2_hub)"
                          d="M244.39,231.8h0c-.02.05-.05.12-.08.2.03-.07.05-.13.08-.2Z"
                        />
                        <path
                          fill="url(#Degradado_sin_nombre_30-3_hub)"
                          d="M354.84,267.87l-.02-.02-4.85-8.29s-.02-.08-.06-.13c-.29-.42-.6-.83-.94-1.25h.21l-14.83-25.35-92.47-158.17-13.25-22.6v-.02l-10.54-18.04c-6.29-10.75-21.83-10.74-28.1.03l-10.8,18.55-13.83,23.76-91.05,156.49-12.33,21.18s-.04.02-.02.04l-2.39,4.12-9.58,16.47c-1.39,4.6-2.12,9.5-2.12,14.54,0,16.26,7.62,30.74,19.49,40.05,5.98,4.71,13.04,8.08,20.74,9.73,3.44.73,7,1.12,10.66,1.12,14.79,0,28.11-6.31,37.4-16.39.56-.6,1.1-1.23,1.62-1.85.08-.08.17-.17.25-.27,5.71-6.23,12.31-11.66,19.58-16.06,10.42-6.3,22.21-10.52,34.84-12.1-4-2.4-7.22-6.06-9.04-10.62,0,0-10.76-26.9-16.65-41.62h0l-3.19-7.98c-.93-.74-2.6-1.82-3.77-2.59-3.23-2.11-6.89-4.5-9.85-7.85-5.71-6.45-10.19-14.44-12.97-23.08-1.5-4.69-2.52-9.57-3.03-14.52-1.27-12.34.62-24.66,5.47-35.62,11.26-25.46,36.49-41.91,64.28-41.91,25.25,0,48.67,14.06,61.13,36.7,12.6,22.9,11.94,49.47-1.76,71.08-3.19,5.03-7,9.64-11.33,13.7-1.92,1.8-4.16,3.18-6.77,4.78-.53.33-1.23.76-1.88,1.17-2.02,5.05-6.96,17.4-19.1,47.74-1.83,4.57-5.05,8.24-9.07,10.64,12.58,1.6,24.33,5.81,34.71,12.08,7.74,4.69,14.72,10.52,20.68,17.28,9.56,10.82,23.08,17.29,37.51,17.29h.81c3.31,0,6.54-.31,9.66-.94,8.14-1.54,15.58-5.04,21.83-9.98,11.83-9.31,19.41-23.76,19.41-39.99,0-7.6-1.67-14.83-4.69-21.33Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 2 Cards (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-14">
              {/* Card 2: Top Right */}
              <div
                data-reveal="fade-left"
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3CB4A3]/40 transition-all duration-300"
              >
                <div className="font-['Exo_2',sans-serif] text-2xl sm:text-3xl font-bold text-[#3CB4A3] mb-1.5 leading-none">
                  8×
                </div>
                <p className="font-['Exo_2',sans-serif] text-sm font-semibold text-[#4F5051] leading-snug mb-1">
                  {isEn ? 'increase in field survey output.' : 'de aumento en la producción de campo.'}
                </p>
                <p className="font-['Exo_2',sans-serif] text-xs text-slate-500 font-normal leading-relaxed">
                  {isEn ? 'Greater survey volume in less time.' : 'Mayor volumen de relevamiento en menos tiempo.'}
                </p>
              </div>

              {/* Card 4: Bottom Right */}
              <div
                data-reveal="fade-left"
                className="relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#3CB4A3]/40 transition-all duration-300"
              >
                <div className="font-['Exo_2',sans-serif] text-2xl sm:text-3xl font-bold text-[#3CB4A3] mb-1.5 leading-none">
                  {isEn ? 'Lower' : 'Menor'}
                </div>
                <p className="font-['Exo_2',sans-serif] text-sm font-semibold text-[#4F5051] leading-snug mb-1">
                  {isEn ? 'need for field crew structure.' : 'necesidad de estructura en campo.'}
                </p>
                <p className="font-['Exo_2',sans-serif] text-xs text-slate-500 font-normal leading-relaxed">
                  {isEn ? 'Resource and team optimization.' : 'Optimización de recursos y equipos.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultadosMedibles;
