import React from 'react';
import { Badge } from '../ui/Badge';
import { Zap, ShieldCheck, Database, Users2, FileCheck, TrendingDown } from 'lucide-react';

export const Beneficios: React.FC = () => {
  const benefits = [
    {
      title: 'Relevamientos más ágiles',
      icon: Zap,
      accentColor: '#3CB4A3',
      bgAccent: 'bg-[#3CB4A3]/10',
      textColor: 'text-[#3CB4A3]',
      borderColor: 'border-[#3CB4A3]/30',
    },
    {
      title: 'Menos controles en campo',
      icon: ShieldCheck,
      accentColor: '#4F56A1',
      bgAccent: 'bg-[#4F56A1]/10',
      textColor: 'text-[#4F56A1]',
      borderColor: 'border-[#4F56A1]/30',
    },
    {
      title: 'Datos más confiables',
      icon: Database,
      accentColor: '#3CB4A3',
      bgAccent: 'bg-[#3CB4A3]/10',
      textColor: 'text-[#3CB4A3]',
      borderColor: 'border-[#3CB4A3]/30',
    },
    {
      title: 'Equipos mejor coordinados',
      icon: Users2,
      accentColor: '#4F56A1',
      bgAccent: 'bg-[#4F56A1]/10',
      textColor: 'text-[#4F56A1]',
      borderColor: 'border-[#4F56A1]/30',
    },
    {
      title: 'Información lista para usar',
      icon: FileCheck,
      accentColor: '#3CB4A3',
      bgAccent: 'bg-[#3CB4A3]/10',
      textColor: 'text-[#3CB4A3]',
      borderColor: 'border-[#3CB4A3]/30',
    },
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-white border-t border-slate-100 relative overflow-hidden">
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3 inline-block">
            <Badge variant="secondary">BENEFICIOS</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight">
            Más eficiencia para decidir, planificar y operar.
          </h2>
        </div>

        {/* 5 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-full border ${item.borderColor} ${item.bgAccent} ${item.textColor} flex items-center justify-center mb-4 shadow-sm`}>
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-[#4F5051] leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Result Card */}
        <div className="w-full relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center bg-gradient-to-r from-[#3CB4A3]/10 via-white to-[#4F56A1]/10 border border-[#3CB4A3]/25 shadow-sm overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#3CB4A3] uppercase mb-2">
              RESULTADO
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3CB4A3]/15 text-[#3CB4A3] flex items-center justify-center border border-[#3CB4A3]/30">
                <TrendingDown className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#4F5051] tracking-tight">
                Menor costo operativo
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
