import React, { useState } from 'react';
import { Radio, Building2, Zap, Car, MapPin, CheckCircle } from 'lucide-react';

export type SectorKey = 'telecom' | 'municipios' | 'energia' | 'vial';

interface SectorInfo {
  key: SectorKey;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accent: string;
  nodesCount: number;
  sampleAssets: Array<{ name: string; tag: string; x: number; y: number }>;
  pathData: string;
}

const sectorsData: Record<SectorKey, SectorInfo> = {
  telecom: {
    key: 'telecom',
    title: 'Telecomunicaciones',
    description: 'Postes y otros activos vinculados con redes y operaciones.',
    icon: Radio,
    color: '#3CB4A3',
    accent: 'from-[#3CB4A3] to-[#2E8B7F]',
    nodesCount: 1420,
    sampleAssets: [
      { name: 'Poste Hormigón Fibra', tag: 'TEL-P-101', x: 25, y: 30 },
      { name: 'Caja Empalme / Mufa Óptica', tag: 'TEL-M-204', x: 45, y: 55 },
      { name: 'Poste Madera Distribución', tag: 'TEL-P-102', x: 70, y: 35 },
      { name: 'Gabinete Telecomunicaciones', tag: 'TEL-G-009', x: 82, y: 70 },
    ],
    pathData: 'M 100,280 L 250,150 L 450,220 L 700,120 L 850,260',
  },
  municipios: {
    key: 'municipios',
    title: 'Gobiernos y municipios',
    description: 'Luminarias, cámaras, semáforos, paradas y otros activos urbanos.',
    icon: Building2,
    color: '#4F56A1',
    accent: 'from-[#4F56A1] to-[#3B417A]',
    nodesCount: 3890,
    sampleAssets: [
      { name: 'Luminaria LED 150W', tag: 'MUN-LUM-01', x: 20, y: 40 },
      { name: 'Semáforo Inteligente', tag: 'MUN-SEM-14', x: 48, y: 32 },
      { name: 'Cámara Domo Seguridad', tag: 'MUN-CAM-88', x: 65, y: 60 },
      { name: 'Parada de Transporte', tag: 'MUN-PAR-03', x: 80, y: 45 },
    ],
    pathData: 'M 120,120 L 300,180 L 480,120 L 650,240 L 820,160',
  },
  energia: {
    key: 'energia',
    title: 'Energía y servicios públicos',
    description: 'Infraestructura distribuida vinculada con redes, mantenimiento y planificación.',
    icon: Zap,
    color: '#E67E22',
    accent: 'from-[#E67E22] to-[#D35400]',
    nodesCount: 960,
    sampleAssets: [
      { name: 'Transformador Distribución', tag: 'ENE-TR-44', x: 30, y: 50 },
      { name: 'Torre Media Tensión', tag: 'ENE-TOR-12', x: 55, y: 25 },
      { name: 'Subestación Transformadora', tag: 'ENE-SET-02', x: 75, y: 65 },
      { name: 'Punto de Conexión Red', tag: 'ENE-PC-19', x: 40, y: 75 },
    ],
    pathData: 'M 80,200 L 280,260 L 520,100 L 740,220 L 900,140',
  },
  vial: {
    key: 'vial',
    title: 'Infraestructura vial',
    description: 'Activos ubicados a lo largo de rutas, autopistas y corredores urbanos.',
    icon: Car,
    color: '#3CB4A3',
    accent: 'from-[#3CB4A3] to-[#4F56A1]',
    nodesCount: 2150,
    sampleAssets: [
      { name: 'Cartel Pórtico Vial', tag: 'VIAL-POR-08', x: 22, y: 35 },
      { name: 'Guardarraíl Flex-Beam', tag: 'VIAL-GD-114', x: 45, y: 65 },
      { name: 'Sensor de Tráfico / Radar', tag: 'VIAL-RAD-05', x: 68, y: 40 },
      { name: 'Cabina de Peaje / Estación', tag: 'VIAL-PEA-01', x: 85, y: 55 },
    ],
    pathData: 'M 60,320 Q 300,180 500,200 T 940,100',
  },
};

export const GisSectorMap: React.FC = () => {
  const [activeSector, setActiveSector] = useState<SectorKey>('telecom');
  const current = sectorsData[activeSector];

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      {/* 4 Interactive Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {(Object.keys(sectorsData) as SectorKey[]).map((key) => {
          const s = sectorsData[key];
          const Icon = s.icon;
          const isActive = activeSector === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSector(key)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-[#3CB4A3] shadow-lg shadow-[#3CB4A3]/10 ring-2 ring-[#3CB4A3]/20'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    isActive ? 'bg-[#3CB4A3] text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isActive && (
                  <span className="text-[10px] font-mono font-bold text-[#3CB4A3] bg-[#3CB4A3]/10 px-2 py-0.5 rounded-full border border-[#3CB4A3]/20">
                    ACTIVO
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-[#4F5051] text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {s.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cartographic Visualizer Canvas */}
      <div className="relative h-[380px] sm:h-[440px] rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Radar & Cartographic Grid */}
        <div className="absolute inset-0 gis-radar-grid opacity-25"></div>

        {/* Vector Network Graph */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sectorPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3CB4A3" />
              <stop offset="100%" stopColor="#4F56A1" />
            </linearGradient>
          </defs>

          {/* Secondary road network */}
          <path d="M 0,100 L 1000,350" stroke="rgba(255,255,255,0.06)" strokeWidth="16" fill="none" />
          <path d="M 300,0 L 200,500" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
          <path d="M 750,0 L 680,500" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />

          {/* Active Sector Dynamic Route / Network Link */}
          <path
            d={current.pathData}
            fill="none"
            stroke="url(#sectorPathGrad)"
            strokeWidth="4"
            strokeDasharray="6 4"
            className="transition-all duration-700"
          />
        </svg>

        {/* Dynamic Nodes Placed on the Map for Active Sector */}
        {current.sampleAssets.map((asset) => (
          <div
            key={asset.tag}
            className="absolute z-20 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
          >
            <div className="relative flex flex-col items-center">
              {/* Asset Badge Tag */}
              <div className="bg-slate-900/90 backdrop-blur border border-[#3CB4A3] text-white px-2.5 py-1 rounded-md text-[11px] font-mono shadow-xl flex items-center gap-1.5 whitespace-nowrap mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#3CB4A3]" />
                <span className="font-bold">{asset.tag}</span>
              </div>

              {/* Pin Center */}
              <div className="w-5 h-5 rounded-full bg-[#4F56A1] border-2 border-white flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#3CB4A3] animate-ping"></div>
              </div>

              {/* Hover Tooltip Details */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-12 bg-slate-900 text-white text-[10px] font-mono p-2 rounded border border-slate-700 whitespace-nowrap shadow-2xl z-30 pointer-events-none">
                <span className="text-[#3CB4A3] font-bold block">{asset.name}</span>
                <span className="text-slate-400">Atributos & Coordenadas sincronizados</span>
              </div>
            </div>
          </div>
        ))}

        {/* Sector Metadata Overlay Box */}
        <div className="absolute top-4 left-4 z-30 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white max-w-sm shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#3CB4A3] animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase text-[#3CB4A3] font-bold tracking-wider">
              CAPA CARTOGRÁFICA EN VIVO
            </span>
          </div>
          <h4 className="text-base font-bold text-white mb-1">{current.title}</h4>
          <p className="text-xs text-slate-300 mb-3">{current.description}</p>

          <div className="flex items-center justify-between text-[11px] font-mono bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">COBERTURA TERRITORIAL:</span>
            <span className="text-[#3CB4A3] font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> RELEVAMIENTO COMPLETO
            </span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-[#3CB4A3] font-bold">RELEVAMIENTO GEOESPACIAL:</span>
            <span className="text-slate-400">Identifica, ubica y organiza activos distribuidos en el territorio.</span>
          </div>
          <span className="text-[11px] text-slate-400">PROYECCIÓN: UTM / EPSG</span>
        </div>
      </div>
    </div>
  );
};
