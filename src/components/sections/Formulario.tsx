import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';

export const Formulario: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    empresa: '',
    email: '',
    sector: '',
    necesidad: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const sectorsList = t.formulario.sectorsList;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombreCompleto || !formData.empresa || !formData.email || !formData.necesidad || !formData.sector) {
      setErrorMsg(t.formulario.errorRequired);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3CB4A3', '#4F56A1', '#BFBFBF'],
      });
    }, 900);
  };

  return (
    <section id="formulario" className="py-20 md:py-28 bg-[#0B0F19] text-white relative overflow-hidden border-t border-white/10">
      {/* Dark Ambient Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Section Info & Contact Details */}
          <div data-reveal="fade-right" className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              {t.formulario.title}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-10">
              {t.formulario.subtitle}
            </p>

            {/* Contact Items Stack */}
            <div className="space-y-6">
              
              {/* Item 1: Email */}
              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-[#3CB4A3] shrink-0" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">{t.formulario.emailLabel}</span>
                  <a href="mailto:ventas@aimapping.net" className="text-sm font-bold text-white hover:text-[#3CB4A3] transition-colors">
                    ventas@aimapping.net
                  </a>
                </div>
              </div>

              {/* Item 2: Teléfono */}
              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-[#3CB4A3] shrink-0" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">{t.formulario.phoneLabel}</span>
                  <a href="tel:+5491162822541" className="text-sm font-bold text-white hover:text-[#3CB4A3] transition-colors">
                    +54 9 11 6282-2541
                  </a>
                </div>
              </div>

              {/* Item 3: Ubicación */}
              <div className="flex items-center gap-3.5">
                <MapPin className="w-5 h-5 text-[#3CB4A3] shrink-0" />
                <div>
                  <span className="text-xs font-medium text-slate-400 block">{t.formulario.locationLabel}</span>
                  <span className="text-sm font-bold text-white">{t.formulario.locationValue}</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Dark Card Form */}
          <div data-reveal="fade-left" className="delay-150 lg:col-span-7 w-full">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#111726]/90 border border-white/[0.08] shadow-2xl backdrop-blur-md relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#3CB4A3]/20 text-[#3CB4A3] flex items-center justify-center mb-6 border border-[#3CB4A3]/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t.formulario.successTitle}
                  </h3>
                  <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm sm:text-base">
                    {t.formulario.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        nombreCompleto: '',
                        empresa: '',
                        email: '',
                        sector: '',
                        necesidad: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-mono font-bold text-[#3CB4A3] bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                  >
                    {t.formulario.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: Nombre completo & Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="form-nombre" className="block text-sm font-semibold text-slate-300 mb-1.5">
                        {t.formulario.nameField}
                      </label>
                      <input
                        id="form-nombre"
                        type="text"
                        required
                        value={formData.nombreCompleto}
                        onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                        placeholder={t.formulario.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#192233] border border-white/10 focus:border-[#3CB4A3] focus:ring-2 focus:ring-[#3CB4A3]/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-empresa" className="block text-sm font-semibold text-slate-300 mb-1.5">
                        {t.formulario.companyField}
                      </label>
                      <input
                        id="form-empresa"
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder={t.formulario.companyPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#192233] border border-white/10 focus:border-[#3CB4A3] focus:ring-2 focus:ring-[#3CB4A3]/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email corporativo */}
                  <div>
                    <label htmlFor="form-email" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      {t.formulario.emailField}
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.formulario.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#192233] border border-white/10 focus:border-[#3CB4A3] focus:ring-2 focus:ring-[#3CB4A3]/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all"
                    />
                  </div>

                  {/* Row 3: Sector de infraestructura */}
                  <div>
                    <label htmlFor="form-sector" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      {t.formulario.sectorField}
                    </label>
                    <select
                      id="form-sector"
                      required
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#192233] border border-white/10 focus:border-[#3CB4A3] focus:ring-2 focus:ring-[#3CB4A3]/20 text-sm text-white outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#192233] text-slate-400">
                        {t.formulario.sectorPlaceholder}
                      </option>
                      {sectorsList.map((s) => (
                        <option key={s} value={s} className="bg-[#192233] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: ¿Qué necesitás relevar o actualizar? */}
                  <div>
                    <label htmlFor="form-necesidad" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      {t.formulario.needField}
                    </label>
                    <textarea
                      id="form-necesidad"
                      required
                      rows={4}
                      value={formData.necesidad}
                      onChange={(e) => setFormData({ ...formData, necesidad: e.target.value })}
                      placeholder={t.formulario.needPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#192233] border border-white/10 focus:border-[#3CB4A3] focus:ring-2 focus:ring-[#3CB4A3]/20 text-sm text-white placeholder:text-slate-500 outline-none transition-all resize-y"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] hover:opacity-95 shadow-lg shadow-[#3CB4A3]/20 hover:shadow-xl hover:shadow-[#3CB4A3]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>{t.formulario.submittingBtn}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t.formulario.submitBtn}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Disclaimer note */}
                  <p className="text-center text-xs text-slate-400 font-normal pt-1">
                    {t.formulario.subtitle}
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Formulario;
