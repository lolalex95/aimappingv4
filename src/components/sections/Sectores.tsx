import React from 'react';
import { SectorAccordion } from '../interactive/SectorAccordion';
import { useLanguage } from '../../context/LanguageContext';

export const Sectores: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="sectores" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal="fade-up" className="max-w-3xl mb-10">
          {/* Eyebrow */}
          <span className="block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#3CB4A3] mb-2 sm:mb-2.5 select-none">
            {language === 'en' ? 'SECTORS' : 'SECTORES'}
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight mb-4">
            {t.sectores.title}
          </h2>

          {/* Intro */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.sectores.subtitle}
          </p>
        </div>

        {/* Interactive Accordion of Sectors */}
        <div data-reveal="fade-up" className="delay-150">
          <SectorAccordion />
        </div>
      </div>
    </section>
  );
};
