import React from 'react';
import { Zap, ShieldCheck, Database, Users2, FileCheck, TrendingDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BeneficiosVariant: React.FC = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      title: t.beneficios.benefit1,
      icon: Zap,
      accentColor: '#3CB4A3',
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/25',
    },
    {
      title: t.beneficios.benefit2,
      icon: ShieldCheck,
      accentColor: '#4F56A1',
      iconColor: 'text-[#4F56A1]',
      iconBg: 'bg-[#4F56A1]/10 border-[#4F56A1]/25',
    },
    {
      title: t.beneficios.benefit3,
      icon: Database,
      accentColor: '#3CB4A3',
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/25',
    },
    {
      title: t.beneficios.benefit4,
      icon: Users2,
      accentColor: '#4F56A1',
      iconColor: 'text-[#4F56A1]',
      iconBg: 'bg-[#4F56A1]/10 border-[#4F56A1]/25',
    },
    {
      title: t.beneficios.benefit5,
      icon: FileCheck,
      accentColor: '#3CB4A3',
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/25',
    },
  ];

  return (
    <section
      id="beneficios"
      className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Map Image con capa blanca al 75% */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="./Assets/img/bg map.svg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-reveal="fade-up" className="text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4F5051] tracking-tight leading-tight">
            {language === 'en' ? (
              <>
                More efficiency to decide,{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  plan and operate.
                </span>
              </>
            ) : (
              <>
                Más eficiencia para decidir,{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  planificar y operar.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* 5 Benefits Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 mb-12 lg:mb-16">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            const delays = ['delay-100', 'delay-150', 'delay-200', 'delay-250', 'delay-300'];
            return (
              <div
                key={item.title}
                data-reveal="fade-up"
                className={`${delays[idx % delays.length]} p-6 sm:p-7 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-sm flex flex-col items-center text-center hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 group`}
              >
                {/* Circular Icon Enclosed */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.85]" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#4F5051] tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card: RESULTADO / Menor costo operativo */}
        <div
          data-reveal="zoom-in"
          className="delay-150 w-full relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-[#3CB4A3]/10 via-white to-[#4F56A1]/10 border border-[#3CB4A3]/25 shadow-sm overflow-hidden"
        >
          {/* Subtle ambient glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#3CB4A3]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* RESULTADO Badge / Eyebrow */}
            <span className="inline-block text-xs sm:text-sm font-extrabold tracking-widest text-[#3CB4A3] uppercase mb-4 px-3 py-1 rounded-full bg-[#3CB4A3]/10 border border-[#3CB4A3]/25">
              {t.beneficios.resultBadge}
            </span>

            {/* Title with circular enclosed icon */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3CB4A3]/15 text-[#3CB4A3] flex items-center justify-center border border-[#3CB4A3]/35 shadow-sm shrink-0">
                <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight">
                {t.beneficios.resultTitle}
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BeneficiosVariant;
