import React, { useState, useEffect } from 'react';
import { Layers, Crosshair, Cpu, CheckCircle2, Play, Pause } from 'lucide-react';

interface DetectedAsset {
  id: string;
  type: string;
  lat: string;
  lng: string;
  elev: string;
  confidence: number;
  x: number;
  y: number;
  code: string;
  category: string;
}

export const GeospatialHeroCanvas: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<DetectedAsset | null>(null);

  const assets: DetectedAsset[] = [
    {
      id: 'AST-8041',
      type: 'Poste de Hormigón 12m',
      category: 'Telecomunicaciones',
      lat: '-34.603722',
      lng: '-58.381592',
      elev: '24.3m',
      confidence: 99.4,
      x: 28,
      y: 35,
      code: 'GEO-PK-019',
    },
    {
      id: 'AST-8042',
      type: 'Luminaria LED Vial 150W',
      category: 'Municipio / Alumbrado',
      lat: '-34.604105',
      lng: '-58.382104',
      elev: '26.1m',
      confidence: 98.7,
      x: 52,
      y: 48,
      code: 'GEO-PK-020',
    },
    {
      id: 'AST-8043',
      type: 'Cámara Domo PTZ Seguridad',
      category: 'Monitoreo Urbano',
      lat: '-34.604580',
      lng: '-58.382710',
      elev: '29.5m',
      confidence: 99.1,
      x: 74,
      y: 62,
      code: 'GEO-PK-021',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden gis-radar-grid">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900 text-white text-xs border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3CB4A3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3CB4A3]"></span>
          </span>
          <span className="font-mono tracking-wider text-slate-300 font-semibold uppercase">
            SISTEMA DE PROCESAMIENTO GEOESPACIAL EN TIEMPO REAL
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 font-mono text-slate-400">
          <span className="hidden md:inline">DATUM: WGS84 / EPSG:4326</span>
          <span className="text-[#3CB4A3] font-bold">PRECISIÓN SUB-MÉTRICA</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white transition-colors bg-slate-800 rounded px-2 flex items-center gap-1 text-[11px]"
            title={isPlaying ? 'Pausar simulación' : 'Reanudar simulación'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'PAUSAR' : 'REANUDAR'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative h-[340px] sm:h-[420px] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Vector Cartographic Grid & Roads */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3CB4A3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4F56A1" stopOpacity="0.8" />
            </linearGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Secondary streets */}
          <path d="M 0,280 Q 250,260 500,320 T 1000,280" fill="none" stroke="rgba(79, 86, 161, 0.25)" strokeWidth="8" />
          <path d="M 120,0 L 200,500" fill="none" stroke="rgba(79, 86, 161, 0.15)" strokeWidth="12" />
          <path d="M 680,0 L 620,500" fill="none" stroke="rgba(79, 86, 161, 0.15)" strokeWidth="12" />

          {/* Main corridor route trajectory */}
          <path
            d="M 50,80 Q 250,180 500,200 T 950,360"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M 50,80 Q 250,180 500,200 T 950,360"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="4"
            strokeDasharray="8 6"
          />

          {/* Optical AI Detection Beam */}
          <circle
            cx={`${15 + (activeStep * 0.75)}%`}
            cy={`${20 + (activeStep * 0.55)}%`}
            r="45"
            fill="none"
            stroke="rgba(60, 180, 163, 0.4)"
            strokeWidth="1.5"
            className="animate-ping"
          />
        </svg>

        {/* Survey Vehicle Tracker */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-75"
          style={{
            left: `${15 + (activeStep * 0.75)}%`,
            top: `${20 + (activeStep * 0.55)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-[#4F56A1] border-2 border-white shadow-lg flex items-center justify-center text-white">
              <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-[10px] font-mono text-[#3CB4A3] px-2 py-0.5 rounded border border-[#3CB4A3]/40 whitespace-nowrap shadow">
              VEHÍCULO DE RELEVAMIENTO
            </div>
          </div>
        </div>

        {/* Georeferenced Asset Hotspots & Bounding Boxes */}
        {assets.map((asset) => {
          const isSelected = selectedAsset?.id === asset.id;
          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="absolute z-30 cursor-pointer group transition-transform duration-200 hover:scale-110"
              style={{ left: `${asset.x}%`, top: `${asset.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Computer Vision Target Box */}
              <div
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#3CB4A3]/20 border-2 border-[#3CB4A3] shadow-lg shadow-[#3CB4A3]/30'
                    : 'border border-dashed border-[#3CB4A3]/80 bg-slate-900/80 hover:border-[#3CB4A3] hover:bg-slate-900'
                }`}
              >
                {/* Corner markers for Computer Vision feel */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#3CB4A3]"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#3CB4A3]"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#3CB4A3]"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#3CB4A3]"></div>

                <div className="flex items-center gap-1.5">
                  <Crosshair className="w-4 h-4 text-[#3CB4A3] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-white whitespace-nowrap">
                    {asset.id}
                  </span>
                </div>

                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span>IA: {asset.confidence}%</span>
                </div>
              </div>

              {/* Pin Indicator */}
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#3CB4A3] to-transparent mx-auto"></div>
            </div>
          );
        })}

        {/* Selected Asset Overlay Card */}
        {selectedAsset && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-[#3CB4A3]/40 text-white shadow-2xl animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#3CB4A3]/20 text-[#3CB4A3] border border-[#3CB4A3]/30">
                  {selectedAsset.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{selectedAsset.type}</h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAsset(null);
                }}
                className="text-slate-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950/70 p-2.5 rounded border border-slate-800 mt-2">
              <div>
                <span className="text-slate-500 block text-[10px]">LATITUD</span>
                <span className="text-slate-200">{selectedAsset.lat}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">LONGITUD</span>
                <span className="text-slate-200">{selectedAsset.lng}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">ELEVACIÓN</span>
                <span className="text-slate-200">{selectedAsset.elev}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">ESTADO GIS</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> LISTO GIS
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Pipeline Strip at bottom */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3CB4A3]"></div>
          <span>1. Captura de recorrido</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4F56A1]"></div>
          <span>2. Identificación IA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
          <span>3. Georreferenciación</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="flex items-center gap-1 font-bold text-emerald-300">
            <Layers className="w-3.5 h-3.5" /> Capa GIS Generada
          </span>
        </div>
      </div>
    </div>
  );
};
