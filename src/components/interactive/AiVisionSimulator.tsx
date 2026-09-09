import React, { useState } from 'react';
import { Scan, MapPin, Database, Eye, ShieldCheck } from 'lucide-react';

interface AssetSample {
  id: string;
  category: string;
  name: string;
  confidence: number;
  lat: string;
  lng: string;
  elev: string;
  attributes: Record<string, string>;
  imageFrame: string;
  box: { top: string; left: string; width: string; height: string };
}

const samples: AssetSample[] = [
  {
    id: 'AST-08492',
    category: 'Telecomunicaciones',
    name: 'Poste de Concreto Multicanal 11m',
    confidence: 99.4,
    lat: '-34.603722',
    lng: '-58.381592',
    elev: '24.30m',
    attributes: {
      'Material': 'Hormigón Armado',
      'Altura Estimada': '11.20 metros',
      'Tendido Aéreo': 'Fibra Óptica + BT',
      'Estado Visual': 'Bueno / Operativo',
      'Código Relevamiento': 'TEL-BA-402',
    },
    imageFrame: 'street-telecom',
    box: { top: '22%', left: '42%', width: '16%', height: '58%' },
  },
  {
    id: 'AST-08493',
    category: 'Gobiernos y Municipios',
    name: 'Luminaria LED Vial 150W Doble Brazo',
    confidence: 98.8,
    lat: '-34.604105',
    lng: '-58.382104',
    elev: '26.15m',
    attributes: {
      'Tipo de Lámpara': 'LED Modular 150W',
      'Soporte': 'Columna Metálica Curva',
      'Orientación': 'Calzada Principal',
      'Estado Físico': 'Activo / Óptimo',
      'Código Relevamiento': 'MUN-LUM-884',
    },
    imageFrame: 'street-lighting',
    box: { top: '15%', left: '38%', width: '24%', height: '45%' },
  },
  {
    id: 'AST-08494',
    category: 'Energía y Servicios',
    name: 'Transformador Distribución 25kVA',
    confidence: 99.1,
    lat: '-34.604580',
    lng: '-58.382710',
    elev: '29.50m',
    attributes: {
      'Capacidad': '25 kVA Trifásico',
      'Montaje': 'Plataforma Aérea',
      'Nivel Tensión': 'Media Tensión 13.2kV',
      'Inspección Visual': 'Sin anomalías térmicas',
      'Código Relevamiento': 'ENE-TR-091',
    },
    imageFrame: 'street-energy',
    box: { top: '30%', left: '35%', width: '30%', height: '40%' },
  },
];

export const AiVisionSimulator: React.FC = () => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState<'all' | 'raw' | 'detect' | 'gis'>('all');
  const sample = samples[selectedSampleIndex];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
      {/* Workbench Header */}
      <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#3CB4A3]/20 border border-[#3CB4A3]/40 text-[#3CB4A3]">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#3CB4A3] tracking-widest font-semibold block">
              DEMOSTRACIÓN INTERACTIVA DE PROCESAMIENTO
            </span>
            <h3 className="text-base font-bold text-white leading-tight">
              Flujo de Detección, Clasificación y Georreferenciación
            </h3>
          </div>
        </div>

        {/* Sample Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
          {samples.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSelectedSampleIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedSampleIndex === idx
                  ? 'bg-gradient-to-r from-[#3CB4A3] to-[#4F56A1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {s.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Center Viewport: Visual Detection Frame */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200">
          {/* Simulated Street Background Canvas */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
            {/* Grid Pattern */}
            <div className="absolute inset-0 gis-radar-grid opacity-25"></div>

            {/* Geometric Street Asset Illustration */}
            <svg className="w-full h-full opacity-70" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>
              <rect width="600" height="400" fill="url(#skyGrad)" />
              {/* Horizon & Road */}
              <polygon points="0,260 600,260 600,400 0,400" fill="#1E293B" />
              <polygon points="120,400 280,260 320,260 480,400" fill="#334155" />
              <line x1="300" y1="260" x2="300" y2="400" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="12 8" />

              {/* Asset illustration: Concrete Pole / Streetlight */}
              <line x1="280" y1="80" x2="280" y2="340" stroke="#64748B" strokeWidth="12" strokeLinecap="round" />
              {/* Arm & Fixture */}
              <path d="M 280,100 Q 330,80 370,110" fill="none" stroke="#64748B" strokeWidth="6" />
              <ellipse cx="370" cy="115" rx="14" ry="6" fill="#3CB4A3" />
              {/* Wires */}
              <path d="M 0,90 Q 280,110 600,90" fill="none" stroke="#475569" strokeWidth="2" />
              <path d="M 0,105 Q 280,125 600,105" fill="none" stroke="#475569" strokeWidth="2" />
            </svg>
          </div>

          {/* AI Bounding Box (Active when not raw-only) */}
          {activeLayer !== 'raw' && (
            <div
              className="absolute z-20 transition-all duration-500 pointer-events-none"
              style={{
                top: sample.box.top,
                left: sample.box.left,
                width: sample.box.width,
                height: sample.box.height,
              }}
            >
              {/* Highlight Target Border */}
              <div className="w-full h-full border-2 border-[#3CB4A3] bg-[#3CB4A3]/10 relative rounded shadow-lg shadow-[#3CB4A3]/20">
                {/* Vision Crosshair corners */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white"></div>

                {/* Floating Tag */}
                <div className="absolute -top-7 left-0 bg-slate-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#3CB4A3] flex items-center gap-1 shadow-md whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#3CB4A3] animate-ping"></span>
                  <span>{sample.id}</span>
                  <span className="text-[#3CB4A3] font-extrabold">{sample.confidence}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Viewport Overlay Controls */}
          <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
            <span className="bg-slate-900/90 text-white text-[10px] font-mono px-2 py-1 rounded border border-slate-700 flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-[#3CB4A3]" /> FRAME: 1920x1080 @ 30FPS
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">CAPAS:</span>
              <button
                onClick={() => setActiveLayer('all')}
                className={`px-2 py-0.5 rounded cursor-pointer ${activeLayer === 'all' ? 'bg-[#3CB4A3] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Completa
              </button>
              <button
                onClick={() => setActiveLayer('detect')}
                className={`px-2 py-0.5 rounded cursor-pointer ${activeLayer === 'detect' ? 'bg-[#4F56A1] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                IA
              </button>
              <button
                onClick={() => setActiveLayer('raw')}
                className={`px-2 py-0.5 rounded cursor-pointer ${activeLayer === 'raw' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Foto Bruta
              </button>
            </div>
            <div className="text-[#3CB4A3] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> RELEVAMIENTO VALIDADO
            </div>
          </div>
        </div>

        {/* Right Sidebar: Structured GIS Attributes & Metadata */}
        <div className="lg:col-span-5 p-6 bg-[#F8FAFC] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F56A1]">
                ATRIBUTOS DEL ACTIVO
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold border border-emerald-200">
                100% Georreferenciado
              </span>
            </div>

            <h4 className="text-lg font-bold text-[#4F5051] mb-1">{sample.name}</h4>
            <p className="text-xs text-slate-500 font-mono mb-4">ID ÚNICO: {sample.id}</p>

            {/* Coordinates Grid */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm mb-4">
              <div className="text-[11px] font-mono font-bold text-slate-500 uppercase mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3CB4A3]" /> Coordenadas Geográficas (WGS84)
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">LATITUD</span>
                  <span className="font-bold text-slate-800">{sample.lat}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">LONGITUD</span>
                  <span className="font-bold text-slate-800">{sample.lng}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">ELEVACIÓN</span>
                  <span className="font-bold text-slate-800">{sample.elev}</span>
                </div>
              </div>
            </div>

            {/* Key-Value Attributes */}
            <div className="space-y-1.5">
              {Object.entries(sample.attributes).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 text-xs"
                >
                  <span className="text-slate-500 font-medium">{key}</span>
                  <span className="font-bold text-[#4F5051] font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Ready Status Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#4F56A1]" />
              <span className="font-medium">Listo para exportar a GIS</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#3CB4A3]">GeoJSON · DWG · SHP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
