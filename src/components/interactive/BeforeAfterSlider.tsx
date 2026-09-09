import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  sliderPosition?: number;
  onPositionChange?: (pos: number) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  sliderPosition: externalPosition,
  onPositionChange,
}) => {
  const [internalPosition, setInternalPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPosition = externalPosition !== undefined ? externalPosition : internalPosition;

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    if (onPositionChange) {
      onPositionChange(position);
    } else {
      setInternalPosition(position);
    }
  }, [onPositionChange]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="w-full select-none">
      {/* Interactive slider frame */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[360px] sm:h-[460px] md:h-[520px] lg:h-[560px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 cursor-ew-resize bg-slate-900 touch-none select-none"
        style={{ userSelect: 'none' }}
      >
        {/* RIGHT LAYER (DESPUÉS: Situación observada · AiMapping - Clipped to right of slider) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(${currentPosition}% 0, 100% 0, 100% 100%, ${currentPosition}% 100%)` }}
        >
          <img
            src="./Assets/img/1/despues.png"
            alt="Detección automática de postes, luminarias y activos con inteligencia artificial y georreferenciación GIS en AiMapping"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Right Bottom Label */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-[#3CB4A3]/50 text-white px-3.5 py-2 rounded-xl shadow-xl max-w-[240px] text-right z-20 pointer-events-none">
            <span className="text-[10px] font-mono uppercase text-[#3CB4A3] font-bold block tracking-wider">
              SITUACIÓN OBSERVADA
            </span>
            <p className="text-[11px] font-semibold text-slate-200 mt-0.5 leading-snug">
              Detección precisa georreferenciada con AiMapping lista para GIS.
            </p>
          </div>
        </div>

        {/* LEFT LAYER (ANTES: Imagen en crudo sin relevar - Clipped to left of slider with dark overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${currentPosition}% 0, ${currentPosition}% 100%, 0 100%)` }}
        >
          <img
            src="./Assets/img/1/antes.png"
            alt="Captura visual en campo sin procesar ni georreferenciar"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Black semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10"></div>

          {/* Left Bottom Label */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-slate-300 text-[#4F5051] px-3.5 py-2 rounded-xl shadow-xl max-w-[240px] z-20 pointer-events-none">
            <span className="text-[10px] font-mono uppercase text-slate-700 font-bold block tracking-wider">
              IMAGEN EN CRUDO
            </span>
            <p className="text-[11px] font-semibold text-slate-700 mt-0.5 leading-snug">
              Captura original del recorrido sin procesar ni identificar activos.
            </p>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-30 pointer-events-none"
          style={{ left: `${currentPosition}%` }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-2xl border-2 border-[#4F56A1] flex items-center justify-center text-[#4F56A1] hover:scale-105 transition-transform">
            <MoveHorizontal className="w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
