import React, { useState } from 'react';
import { FileCode, Layers, MapPin, Tag, ListChecks, Image as ImageIcon, Check } from 'lucide-react';

const formats = [
  {
    name: 'GeoJSON',
    extension: '.geojson',
    type: 'Estándar Web / GIS',
    sample: `{
  "type": "FeatureCollection",
  "name": "AiMapping_Activos_Relevados",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-58.381592, -34.603722, 24.30] },
      "properties": {
        "id_activo": "AST-08492",
        "tipo_activo": "Poste Hormigón 11m",
        "sector": "Telecomunicaciones",
        "altura_m": 11.20,
        "material": "Hormigón Armado",
        "estado": "Operativo",
        "url_imagen": "https://data.aimapping.com/img/AST-08492.jpg",
        "fecha_relevamiento": "2026-08-24"
      }
    }
  ]
}`,
  },
  {
    name: 'Shapefile',
    extension: '.shp / .dbf',
    type: 'Esri Shapefile Vector',
    sample: `ESRI Shapefile Geodatabase Package:
- AiMapping_Capa_Activos.shp (Geometrías Puntuales WGS84)
- AiMapping_Capa_Activos.shx (Índice Posicional Espacial)
- AiMapping_Capa_Activos.dbf (Tabla de Atributos estructurada)
- AiMapping_Capa_Activos.prj (Definición de Proyección EPSG:4326)
- AiMapping_Capa_Activos.cpg (Codificación UTF-8)`,
  },
  {
    name: 'DXF',
    extension: '.dxf',
    type: 'AutoCAD Drawing Exchange',
    sample: `0
SECTION
2
ENTITIES
0
POINT
8
CAPA_AIMAPPING_ACTIVOS
10
-58.381592
20
-34.603722
30
24.300000
0
ENDSEC
0
EOF`,
  },
  {
    name: 'DWG',
    extension: '.dwg',
    type: 'AutoCAD Nativo CAD/BIM',
    sample: `AutoCAD Native Binary Vector:
Layer: AIMAPPING_INFRAESTRUCTURA_PUNTOS
Block: BLOQUE_ACTIVO_GEOREFERENCIADO
Attributes Attached: [ID, TIPO, ALTURA, ESTADO, FOTO_LINK]
Coordinate System: Projected Transverse Mercator / POSGAR`,
  },
  {
    name: 'QGIS',
    extension: '.qgz / .qml',
    type: 'Proyecto QGIS con Simbología',
    sample: `<qgis version="3.34.0" styleCategories="AllStyleCategories">
  <renderer-v2 type="categorizedSymbol" attr="tipo_activo">
    <categories>
      <category symbol="0" value="Poste Hormigón" label="Postes"/>
      <category symbol="1" value="Luminaria LED" label="Alumbrado"/>
    </categories>
  </renderer-v2>
</qgis>`,
  },
  {
    name: 'ArcGIS',
    extension: '.lyrx / .gdb',
    type: 'File Geodatabase ArcGIS Pro',
    sample: `ArcGIS File Geodatabase (FGDB):
FeatureClass: AiMapping_Infraestructura_Activos
Topology: Strict Node Connectivity
Attachments: Enabled (Hi-Res Street Survey Photos embedded)
Domains: Coded Values for Asset Classification`,
  },
  {
    name: 'CSV',
    extension: '.csv',
    type: 'Tabla Georreferenciada',
    sample: `id_activo,latitud,longitud,elevacion_m,tipo_activo,material,estado,foto_relevamiento
AST-08492,-34.603722,-58.381592,24.30,Poste Hormigón,Hormigón Armado,Operativo,https://aimapping.com/f1.jpg
AST-08493,-34.604105,-58.382104,26.15,Luminaria LED,Metal Curvo,Optimo,https://aimapping.com/f2.jpg
AST-08494,-34.604580,-58.382710,29.50,Transformador,Media Tensión,Sin anomalías,https://aimapping.com/f3.jpg`,
  },
];

export const FormatCodePreview: React.FC = () => {
  const [activeFormatIndex, setActiveFormatIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentFormat = formats[activeFormatIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFormat.sample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 4 Connected Asset Pillars visual schema */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="gis-card p-5 rounded-2xl flex flex-col justify-between border-l-4 border-l-[#3CB4A3]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#3CB4A3]/10 text-[#3CB4A3]">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#4F5051]">Ubicación</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Referencia geográfica del activo relevado.
          </p>
        </div>

        <div className="gis-card p-5 rounded-2xl flex flex-col justify-between border-l-4 border-l-[#4F56A1]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#4F56A1]/10 text-[#4F56A1]">
              <Tag className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#4F5051]">Tipo de activo</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clasificación de los elementos definidos.
          </p>
        </div>

        <div className="gis-card p-5 rounded-2xl flex flex-col justify-between border-l-4 border-l-[#3CB4A3]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#3CB4A3]/10 text-[#3CB4A3]">
              <ListChecks className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#4F5051]">Atributos</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Datos asociados según la necesidad de la organización.
          </p>
        </div>

        <div className="gis-card p-5 rounded-2xl flex flex-col justify-between border-l-4 border-l-[#4F56A1]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#4F56A1]/10 text-[#4F56A1]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#4F5051]">Imagen asociada</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Registro visual vinculado al activo cuando corresponda.
          </p>
        </div>
      </div>

      {/* Deliverable Structure Highlight Banner */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#3CB4A3] to-[#4F56A1] text-white">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#3CB4A3] tracking-wider font-bold">
              ESTRUCTURA DEL ENTREGABLE
            </span>
            <p className="text-base font-bold text-slate-100">
              Capa GIS georreferenciada con vinculación directa a foto y atributos
            </p>
          </div>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
          COMPATIBILIDAD TOTAL
        </div>
      </div>

      {/* Formats Selector Tabs & Code Inspector */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#4F56A1] font-bold tracking-wider">
              FORMATOS DE ENTREGA
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              La entrega puede adaptarse a DXF, DWG, QGIS, ArcGIS, imágenes, grabaciones u otros formatos acordados.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="self-start md:self-auto px-3 py-1.5 rounded-lg text-xs font-mono bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <FileCode className="w-3.5 h-3.5 text-[#3CB4A3]" />
                <span>Copiar estructura</span>
              </>
            )}
          </button>
        </div>

        {/* Format Pills */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 flex flex-wrap gap-2">
          {formats.map((fmt, idx) => (
            <button
              key={fmt.name}
              onClick={() => setActiveFormatIndex(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeFormatIndex === idx
                  ? 'bg-[#4F56A1] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {fmt.name}
            </button>
          ))}
        </div>

        {/* Code Content View */}
        <div className="p-5 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-800 mb-3">
            <span>FORMATO: <strong className="text-[#3CB4A3]">{currentFormat.name}</strong> ({currentFormat.extension})</span>
            <span>{currentFormat.type}</span>
          </div>
          <pre className="text-emerald-400 font-mono whitespace-pre leading-relaxed">
            {currentFormat.sample}
          </pre>
        </div>
      </div>
    </div>
  );
};
