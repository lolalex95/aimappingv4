import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CtaBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="cta-banner" className="py-24 md:py-32 bg-[#0B0F19] text-white relative overflow-hidden border-y border-white/10">
      {/* Full-width Dark GIS grid pattern & ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#3CB4A3]/15 to-[#4F56A1]/20 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Decorative side glows */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Title */}
          <h2
            data-reveal="fade-up"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-10"
          >
            {t.ctaBanner.title}
          </h2>

          {/* CTA Button */}
          <div data-reveal="fade-up" className="delay-150 flex justify-center">
            <a
              href="#formulario"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] hover:opacity-95 shadow-xl shadow-[#3CB4A3]/25 hover:shadow-2xl hover:shadow-[#3CB4A3]/35 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.ctaBanner.button}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
export default CtaBanner;
