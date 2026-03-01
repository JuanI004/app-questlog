"use client";
import Image from "next/image";
import { useState } from "react";

export default function PestañaHabilidades({
  habilidades,
  habilidadesJugador,
  color,
  colorRgb,
  nivelJugador,
  handleDesbloquear,
}) {
  const [hoveredHabilidad, setHoveredHabilidad] = useState(null);
  const [habilidadSeleccionada, setHabilidadSeleccionada] = useState(null);
  function tieneHabilidad(habilidadId) {
    return habilidadesJugador.some((h) => h.habilidad_id === habilidadId);
  }
  function habilidadDispoible(habilidadId) {
    const habilidad = habilidades.find((h) => h.id === habilidadId);
    if (!habilidad) return false;
    return nivelJugador >= habilidad.nivel_requerido;
  }
  return (
    <div className="w-full flex flex-col items-center gap-2 pt-6">
      {habilidades.map((habilidad) => {
        const desbloqueada = tieneHabilidad(habilidad.id);
        const disponible = nivelJugador >= habilidad.nivel_requerido;
        const esPrevia = habilidades.filter(
          (h) => h.prerequisito_id === habilidad.id,
        );
        return (
          <div
            key={habilidad.id}
            className="relative flex flex-col gap-2 items-center"
          >
            <div
              className=" p-2 border max-w-[58px] border-[#234b72] rounded-sm cursor-pointer"
              onMouseEnter={() => setHoveredHabilidad(habilidad.id)}
              onMouseLeave={() => setHoveredHabilidad(null)}
              onClick={() => {
                setHabilidadSeleccionada(habilidad.id);
                if (!hoveredHabilidad) {
                  setHoveredHabilidad(habilidad.id);
                } else {
                  setHoveredHabilidad(null);
                }
              }}
              style={{
                borderColor: desbloqueada
                  ? color
                  : disponible
                    ? "#234b72"
                    : "#17324d",
                background:
                  habilidadSeleccionada === habilidad.id
                    ? `rgba(${colorRgb}, 0.2)`
                    : "transparent",
              }}
            >
              <Image
                src={habilidad.icono}
                alt={habilidad.nombre}
                width={40}
                height={40}
                style={{ opacity: !desbloqueada && !disponible ? 0.15 : 1 }}
              />
            </div>
            <h2
              className="text-xs text-slate-400 uppercase font-bold  text-center tracking-widest"
              style={{
                color: desbloqueada || disponible ? "#90a1b9" : "#314158",
              }}
            >
              {habilidad.nombre}
            </h2>
            <p className="text-[0.6rem] text-slate-400 uppercase  text-center tracking-widest">
              Nv {habilidad.nivel_requerido}
            </p>
            {hoveredHabilidad === habilidad.id && (
              <div className="absolute flex flex-col gap-2 -top-25 w-48 p-3 bg-linear-to-br from-[#0d1e30] via-[#0a1828]  to-[#060e18] border border-[#234b72] rounded-sm text-xs z-10">
                <h2 className="text-md text-[#D4A017] uppercase font-bold tracking-widest">
                  {habilidad.nombre}
                </h2>
                <p className="text-[0.7rem] text-slate-400  tracking-widest">
                  {habilidad.descripcion}
                </p>
                <div className="flex gap-5">
                  <p className="text-[0.6rem] text-slate-400 uppercase  text-center tracking-widest">
                    Nivel{" "}
                    <span
                      style={{
                        color: !disponible && !desbloqueada ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {habilidad.nivel_requerido}
                    </span>
                  </p>
                  <p className="text-[0.6rem] text-slate-400 uppercase  text-center tracking-widest">
                    <span
                      style={{
                        color: !disponible && !desbloqueada ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {habilidad.nivel_requerido}
                    </span>{" "}
                    Monedas
                  </p>
                </div>
              </div>
            )}
            {esPrevia.length > 0 && (
              <span
                className="h-8 rotate-180 border-2"
                style={{
                  borderColor: desbloqueada ? color : "#234b72",
                  boxShadow: desbloqueada ? `0 0 8px ${color}` : "none",
                }}
              />
            )}
          </div>
        );
      })}
      <div className="grid grid-cols-3 mt-4 justify-center w-xs gap-2 items-center">
        <div className="flex w-full items-center gap-2 justify-center">
          <span
            className="w-3 h-3 border rounded-sm"
            style={{ borderColor: color }}
          />
          <p className="text-xs text-slate-400">Desbloqueada</p>
        </div>
        <div className="flex w-full items-center gap-2 justify-center">
          <span
            className="w-3 h-3 border rounded-sm"
            style={{ borderColor: "#234b72" }}
          />
          <p className="text-xs text-slate-400">Disponible</p>
        </div>
        <div className="flex w-full items-center gap-2">
          <span
            className="w-3 h-3 border rounded-sm"
            style={{ borderColor: "#17324d" }}
          />
          <p className="text-xs text-slate-400">Bloqueada</p>
        </div>
      </div>
      {habilidadSeleccionada && habilidadDispoible(habilidadSeleccionada) && (
        <button
          onClick={() => handleDesbloquear(habilidadSeleccionada)}
          className="
                mt-6 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-10 py-5 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
        >
          Desbloquear <br />
          <span className="text-xs">
            {"("}
            {habilidades.find((h) => h.id === habilidadSeleccionada)?.nombre}
            {")"}
          </span>
        </button>
      )}
    </div>
  );
}
