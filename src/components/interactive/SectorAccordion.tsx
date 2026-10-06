import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const SectorAccordion: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sectorItems = [
    {
      id: 'telecom',
      title: t.sectores.telecomTitle,
      description: t.sectores.telecomDesc,
      idleUrl: './Assets/img/6/telecomunicaciones-sf.jpg',
      activeUrl: './Assets/img/6/Telecomunicaciones.jpg',
      idlePosition: 'object-[15%_center]',
      activePosition: 'object-[center_top]',
      activeTransform: 'group-hover/article:scale-100 group-focus-within/article:scale-100',
    },
    {
      id: 'energia',
      title: t.sectores.energiaTitle,
      description: t.sectores.energiaDesc,
      idleUrl: './Assets/img/6/Energia_y_Serv_Publicos(normal).jpg',
      activeUrl: './Assets/img/6/Energia_y_Serv_Publicos-02(hover).jpg',
      idlePosition: 'object-[18%_center]',
      activePosition: 'object-[center_top]',
      activeTransform: 'group-hover/article:scale-100 group-focus-within/article:scale-100',
    },
    {
      id: 'vial',
      title: t.sectores.vialTitle,
      description: t.sectores.vialDesc,
      idleUrl: './Assets/img/6/Infraestructura_Vial-(normal).jpg',
      activeUrl: './Assets/img/6/Infraestructura_Vial-(hover).jpg',
      idlePosition: 'object-center',
      activePosition: 'object-[center_top]',
      activeTransform: 'group-hover/article:scale-100 group-focus-within/article:scale-100',
    },
  ];

  return (
    <div className="w-full my-6 select-none">
      <div className="group/container flex flex-col md:flex-row justify-center gap-3.5 w-full mx-auto">
        {sectorItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <article
              key={item.id}
              tabIndex={0}
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              className={`group/article relative w-full md:flex-1 md:hover:flex-[3.5] md:focus-within:flex-[3.5] rounded-2xl overflow-hidden cursor-pointer transition-[flex] duration-500 ease-[cubic-bezier(.4,0,.2,1)] before:absolute before:inset-0 before:bg-gradient-to-t before:from-slate-950/80 before:via-slate-950/20 before:to-transparent before:z-10 after:absolute after:inset-0 after:bg-slate-950/15 after:backdrop-blur-[0.5px] after:transition-opacity duration-300 md:group-hover/container:after:opacity-40 hover:after:!opacity-0 focus-within:after:!opacity-0 hover:ring-2 hover:ring-[#3CB4A3] focus-within:ring-2 focus-within:ring-[#3CB4A3] shadow-xl ${
                isActive ? 'ring-2 ring-[#3CB4A3] after:!opacity-0' : ''
              }`}
            >
              {/* Badge indicador interactivo para Mobile */}
              <div className="md:hidden absolute top-3.5 right-3.5 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide shadow-lg transition-all duration-300">
                <span
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-[#3CB4A3] animate-pulse' : 'bg-white/60'
                  }`}
                />
                <span>
                  {isActive
                    ? language === 'en'
                      ? 'AI Detection'
                      : 'Detección IA'
                    : language === 'en'
                    ? 'Tap to inspect'
                    : 'Toca para ver IA'}
                </span>
              </div>

              {/* Text Information Overlay */}
              <div className="absolute inset-0 text-white z-20 p-5 sm:p-7 flex flex-col justify-end pointer-events-none">
                {/* Compact Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug mb-1.5 transition-all duration-300 md:group-hover/container:opacity-0 group-hover/article:!opacity-100 group-focus-within/article:!opacity-100 opacity-100 drop-shadow-md">
                  {item.title}
                </h3>

                {/* Description: Visible by default on mobile (<md), expands on hover in desktop (>=md) */}
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-lg transition-all duration-300 opacity-100 max-h-24 md:opacity-0 md:max-h-0 md:group-hover/article:opacity-100 md:group-hover/article:max-h-24 md:group-focus-within/article:opacity-100 md:group-focus-within/article:max-h-24 drop-shadow">
                  {item.description}
                </p>
              </div>

              {/* 1. LAYER INACTIVO (Fotos SF / Normal): Con encuadre desplazado hacia la izquierda */}
              <img
                className={`absolute inset-0 object-cover ${item.idlePosition || 'object-center'} h-full w-full ${
                  isActive ? 'opacity-0' : 'opacity-100'
                } md:group-hover/article:opacity-0 md:group-focus-within/article:opacity-0 transition-all duration-700 ease-out transform group-hover/article:scale-105`}
                src={item.idleUrl}
                alt={`Relevamiento de activos e infraestructura en ${item.title} - Registro visual`}
                loading="lazy"
              />

              {/* 2. LAYER ACTIVO (Fotos con detección / Hover): Fade in al ponerse activo o al hacer tap en mobile */}
              <img
                className={`object-cover ${item.activePosition || 'object-center'} h-72 md:h-[480px] w-full ${
                  isActive ? '!opacity-100' : 'opacity-0'
                } md:group-hover/article:opacity-100 md:group-focus-within/article:opacity-100 transition-all duration-700 ease-out transform ${
                  item.activeTransform || 'group-hover/article:scale-105'
                }`}
                src={item.activeUrl}
                alt={`Detección automatizada con IA y georreferenciación GIS en ${item.title}`}
                loading="lazy"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default SectorAccordion;
