import React from 'react';
import { CheckCircle2, Users2, Layers, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BeneficiosVariant: React.FC = () => {
  const { t, language } = useLanguage();

  const topBenefits = [
    {
      title: t.beneficios.benefit1Title,
      description: t.beneficios.benefit1Desc,
      icon: CheckCircle2,
      accentColor: 'bg-[#3CB4A3]',
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/25',
    },
    {
      title: t.beneficios.benefit2Title,
      description: t.beneficios.benefit2Desc,
      icon: Users2,
      accentColor: 'bg-[#4F56A1]',
      iconColor: 'text-[#4F56A1]',
      iconBg: 'bg-[#4F56A1]/10 border-[#4F56A1]/25',
    },
    {
      title: t.beneficios.benefit3Title,
      description: t.beneficios.benefit3Desc,
      icon: Layers,
      accentColor: 'bg-[#3CB4A3]',
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/25',
    },
  ];

  const resultBenefit = {
    title: t.beneficios.resultTitle,
    description: t.beneficios.resultDesc,
  };

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
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4F5051] tracking-tight leading-tight">
            {language === 'en' ? (
              <>
                More clarity to decide,{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  plan and operate
                </span>
              </>
            ) : (
              <>
                Más claridad para decidir,{' '}
                <span className="bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] bg-clip-text text-transparent">
                  planificar y operar
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {topBenefits.map((item, idx) => {
            const Icon = item.icon;
            const delays = ['delay-100', 'delay-200', 'delay-300'];
            return (
              <div
                key={item.title}
                data-reveal="fade-up"
                className={`${delays[idx % delays.length]} flex flex-col items-start text-left p-2 sm:p-4`}
              >
                {/* Circular Icon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-6 shadow-sm`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#4F5051] mb-2.5 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card: Spanning full width across all 3 columns */}
        <div
          data-reveal="zoom-in"
          className="delay-150 w-full relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-[#3CB4A3]/10 via-white to-[#4F56A1]/10 border border-[#3CB4A3]/25 shadow-sm overflow-hidden"
        >
          
          {/* Subtle ambient glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#3CB4A3]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-2 sm:mb-3">
              {resultBenefit.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
              {resultBenefit.description}
            </p>

            {/* Down Arrow Circle Indicator */}
            <div className="w-8 h-8 rounded-full border border-[#3CB4A3]/40 bg-white flex items-center justify-center text-[#3CB4A3] mx-auto mt-6 shadow-sm">
              <ArrowDown className="w-4 h-4 stroke-[2]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeneficiosVariant;
