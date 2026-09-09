import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  compact = false,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center bg-slate-100/90 hover:bg-slate-200/80 p-1 rounded-full border border-slate-200/90 shadow-sm transition-all select-none ${className}`}
      role="group"
      aria-label="Selector de idioma / Language selector"
    >
      {!compact && (
        <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" aria-hidden="true" />
      )}

      {/* Button ES */}
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'es'
            ? 'bg-gradient-brand text-white shadow-sm shadow-[#3CB4A3]/25 scale-100'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'es'}
        title="Español"
      >
        ES
      </button>

      {/* Button EN */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-gradient-brand text-white shadow-sm shadow-[#3CB4A3]/25 scale-100'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'en'}
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
