import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../ui/LanguageToggle';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.howItWorks, href: '#como-funciona' },
    { label: t.nav.benefits, href: '#beneficios' },
    { label: t.nav.sectors, href: '#sectores' },
    { label: t.nav.faq, href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center focus:outline-none">
            <Logo className="h-8 sm:h-9 w-auto" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#4F5051] hover:text-[#4F56A1] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#3CB4A3] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions: Language Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Toggler */}
            <LanguageToggle />

            {/* Desktop CTA */}
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-brand hover:opacity-95 hover:shadow-lg hover:shadow-[#4F56A1]/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.nav.requestDemo}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Controls: Language Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4F5051] hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#4F5051] hover:text-[#4F56A1] py-2 border-b border-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#formulario"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-brand shadow-md"
              >
                <span>{t.nav.requestDemo}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
