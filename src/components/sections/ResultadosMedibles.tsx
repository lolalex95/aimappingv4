import React from 'react';
import { Clock, DollarSign, BarChart2, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ResultadosMedibles: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const metrics = [
    {
      icon: Clock,
      stat: '8×',
      title: isEn
        ? 'reduction in field work time.'
        : 'de reducción en tiempos de trabajo de campo.',
      subtitle: isEn
        ? 'Processes that go from months to weeks.'
        : 'Procesos que pasan de meses a semanas.',
    },
    {
      icon: DollarSign,
      stat: '8×',
      title: isEn
        ? 'increase in field survey output.'
        : 'de aumento en la producción de campo.',
      subtitle: isEn
        ? 'Greater survey volume in less time.'
        : 'Mayor volumen de relevamiento en menos tiempo.',
    },
    {
      icon: BarChart2,
      stat: isEn ? 'Up to 40%' : 'Hasta 40%',
      title: isEn
        ? 'reduction in operating costs.'
        : 'menos de costos operativos.',
      subtitle: isEn
        ? 'Direct efficiency on the bottom line.'
        : 'Eficiencia directa en el balance general.',
    },
    {
      icon: Zap,
      stat: isEn ? 'Lower' : 'Menor',
      title: isEn
        ? 'need for field crew structure.'
        : 'necesidad de estructura en campo.',
      subtitle: isEn
        ? 'Resource and team optimization.'
        : 'Optimización de recursos y equipos.',
    },
  ];

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
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
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

        {/* 4 Cards Grid - Direct clean cards without graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            const delays = ['delay-100', 'delay-150', 'delay-200', 'delay-250'];
            return (
              <div
                key={idx}
                data-reveal="fade-up"
                className={`${delays[idx]} bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left`}
              >
                {/* Soft rounded icon container with turquoise accent */}
                <div className="w-11 h-11 rounded-xl bg-[#3CB4A3]/10 text-[#3CB4A3] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Big Stat */}
                <div className="text-3xl sm:text-4xl font-extrabold text-[#3CB4A3] mb-3 leading-none tracking-tight">
                  {item.stat}
                </div>

                {/* Title */}
                <p className="text-sm sm:text-base font-bold text-[#4F5051] leading-snug mb-2">
                  {item.title}
                </p>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResultadosMedibles;
