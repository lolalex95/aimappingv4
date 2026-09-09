import React from 'react';
import { Badge } from '../ui/Badge';
import { CheckCircle, Users2, Workflow, TrendingDown } from 'lucide-react';

export const Beneficios: React.FC = () => {
  const benefits = [
    {
      title: 'Menos verificaciones',
      description: 'La información relevada reduce la necesidad de nuevos controles y revisiones en campo.',
      icon: CheckCircle,
      accentColor: '#3CB4A3',
      bgAccent: 'bg-[#3CB4A3]/10',
      textColor: 'text-[#3CB4A3]',
    },
    {
      title: 'Mayor consistencia entre equipos',
      description: 'GIS, operaciones, mantenimiento, planificación y despliegue pueden trabajar sobre una misma referencia.',
      icon: Users2,
      accentColor: '#4F56A1',
      bgAccent: 'bg-[#4F56A1]/10',
      textColor: 'text-[#4F56A1]',
    },
    {
      title: 'Información lista para usar',
      description: 'Los resultados se entregan para integrarse a las herramientas y procesos de la organización.',
      icon: Workflow,
      accentColor: '#3CB4A3',
      bgAccent: 'bg-[#3CB4A3]/10',
      textColor: 'text-[#3CB4A3]',
    },
    {
      title: 'Menor costo operativo',
      description: 'Aprovecha mejor el tiempo y los recursos del equipo.',
      icon: TrendingDown,
      accentColor: '#4F56A1',
      bgAccent: 'bg-[#4F56A1]/10',
      textColor: 'text-[#4F56A1]',
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
          {/* Label: BENEFICIOS */}
          <div className="mb-3 inline-block">
            <Badge variant="secondary">BENEFICIOS</Badge>
          </div>

          {/* Title: Más claridad para decidir, planificar y operar. */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#4F5051] tracking-tight leading-tight">
            Más claridad para decidir, planificar y operar.
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="gis-card p-8 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start gap-6 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`p-4 rounded-2xl ${item.bgAccent} ${item.textColor} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#4F5051] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
