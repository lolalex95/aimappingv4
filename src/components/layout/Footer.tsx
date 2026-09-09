import React from 'react';
import { Logo } from '../brand/Logo';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 overflow-hidden relative">
      {/* Subtle brand ambient accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <Logo className="h-9 sm:h-10 w-auto" variant="dark" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm mb-4">
                {t.footer.description}
              </p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#como-funciona" className="hover:text-[#3CB4A3] transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#que-recibes" className="hover:text-[#3CB4A3] transition-colors">
                  {t.nav.whatYouGet}
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-[#3CB4A3] transition-colors">
                  {t.nav.benefits}
                </a>
              </li>
              <li>
                <a href="#sectores" className="hover:text-[#3CB4A3] transition-colors">
                  {t.nav.sectors}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#3CB4A3] transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#formulario" className="hover:text-[#3CB4A3] transition-colors">
                  {t.footer.contactTitle}
                </a>
              </li>
            </ul>
          </div>

          {/* CTA & LinkedIn Column (Centrado verticalmente) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-3.5">
              {/* Circular Outlined LinkedIn Button (a la izquierda) */}
              <a
                href="https://www.linkedin.com/company/aimapping-url/about/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de AiMapping"
                className="w-11 h-11 rounded-full border border-slate-700/80 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-[#3CB4A3] flex items-center justify-center transition-all duration-200 group shadow-sm hover:scale-105 shrink-0"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              {/* Solicita tu demo Button */}
              <a
                href="#formulario"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-brand hover:opacity-95 shadow-lg shadow-[#4F56A1]/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.nav.requestDemo}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 AiMapping. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};
