import React, { useRef, useEffect } from 'react';
import { Badge } from '../ui/Badge';
import { Sparkles, Cpu, MapPin, Database, ArrowRight } from 'lucide-react';

export const Demostracion: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const features = [
    {
      icon: Cpu,
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/30',
      title: 'Detección automatizada con IA',
      description:
        'Identificación y clasificación simultánea de activos visibles en el recorrido.',
    },
    {
      icon: MapPin,
      iconColor: 'text-[#818cf8]',
      iconBg: 'bg-[#4F56A1]/20 border-[#818cf8]/30',
      title: 'Georreferenciación y atributos',
      description:
        'Cálculo de coordenadas espaciales y estructuración de capas GIS.',
    },
    {
      icon: Database,
      iconColor: 'text-[#3CB4A3]',
      iconBg: 'bg-[#3CB4A3]/10 border-[#3CB4A3]/30',
      title: 'Entrega lista para tus sistemas',
      description:
        'Integración directa en Shapefile, GeoJSON, CSV y bases de datos espaciales.',
    },
  ];

  return (
    <section id="demostracion" className="py-20 md:py-28 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Dark GIS grid pattern & ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3CB4A3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4F56A1]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Balanced 86vw container matching Evidencia Visual */}
      <div className="w-full max-w-[86vw] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP ROW: Video (Left) + Text Header (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          
          {/* LEFT: Video Player (Autoplay) */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/90 backdrop-blur-sm group">
              {/* Top video tag */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 select-none">
                <span className="w-2 h-2 rounded-full bg-[#3CB4A3] animate-pulse" />
                <span className="text-xs font-mono font-medium text-slate-200 uppercase tracking-wider">
                  AiMapping Engine Demo
                </span>
              </div>

              {/* Video Element */}
              <video
                ref={videoRef}
                src="./Assets/Vids/demo/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto aspect-video object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Header & Description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-3">
              <Badge variant="primary">DEMOSTRACIÓN</Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Mira cómo AiMapping transforma imágenes en información.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Los activos y atributos se definen según cada relevamiento, procesando automáticamente grandes volúmenes de video e imágenes con máxima precisión y velocidad.
            </p>
          </div>

        </div>

        {/* BOTTOM ROW 1: 3 Feature Cards (Full Width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#3CB4A3]/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3CB4A3]/5"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                  {feat.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ROW 2: Centered CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="#formulario"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] text-white font-bold text-base shadow-lg shadow-[#3CB4A3]/20 hover:shadow-[#3CB4A3]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Solicitar demostración con tus datos
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
};
export default Demostracion;
