"use client";

import Image from "next/image";
import monedasIcon from "../public/monedas-icon.svg";
import MarcoPreview from "./MarcoPreview";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function PestañaTienda({
  filtroRareza,
  categoria,
  rarezas,
  items,
  itemsComprados,
  mensaje,
  handleComprar,
  handleEquipar,
}) {
  function itemComprado(item) {
    return itemsComprados.some((comprado) => comprado.item_id === item.id);
  }
  function itemEquipado(item) {
    return itemsComprados.some(
      (comprado) => comprado.item_id === item.id && comprado.equipado === true,
    );
  }
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 ">
      {mensaje && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-sm text-sm font-bold ${mensaje.error ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {mensaje.error || mensaje.success}
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between gap-2 p-2 border overflow-hidden border-[#234b72] bg-[#08111d] transition-all duration-200 hover:bg-[#0a1a2a] hover:-translate-y-0.5 rounded-sm"
        >
          {categoria === "titulo" && (
            <div className=" h-20 flex items-center justify-center rounded-sm">
              <div
                className="relative px-2 py-2 flex items-center gap-2 border border-[#1e3a5a] rounded-sm text-center "
                style={{
                  background:
                    "linear-gradient(135deg, #0d1e30, #0a1828, #0d1e30)",
                  boxShadow:
                    "0 0 12px rgba(42,90,138,0.4), inset 0 1px 0 rgba(57,119,182,0.15)",
                }}
              >
                <span className="shrink-0 w-2 h-2 rotate-45 inline-block bg-[#D4A017] shadow-[0_0_6px_rgba(212,160,23,0.7)]" />
                <p className=" text-[0.65rem] font-black uppercase tracking-[3px] text-center text-[#D4A017] text-shadow-[0_0_6px_rgba(212,160,23,0.5)]">
                  {item.datos?.texto}
                </p>
                <span className="shrink-0 w-2 h-2 rotate-45 inline-block bg-[#D4A017] shadow-[0_0_6px_rgba(212,160,23,0.7)]" />
              </div>
            </div>
          )}
          {categoria === "marco" && (
            <MarcoPreview
              item={item}
              size={20}
              sizePx={80}
              animacion={item.datos?.animacion}
            >
              <div
                className="absolute inset-0 rounded-full bg-[#0a1828] flex items-center justify-center"
                style={{ zIndex: 0 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#17324d]" />
              </div>
            </MarcoPreview>
          )}
          {categoria === "fondo" && (
            <Image
              src={item.datos?.url}
              alt={item.nombre}
              width={400}
              height={400}
              className="w-full h-30 object-cover rounded-sm"
            />
          )}
          {categoria === "mascota" && (
            <div className="flex items-center justify-center h-30">
              {item.datos?.sprite ? (
                <Image
                  src={item.datos.sprite}
                  alt={item.nombre}
                  width={200}
                  height={200}
                  className="h-30 w-30 object-contain"
                  style={{
                    animation:
                      item.datos.animacion === "flotar" ||
                      item.datos.animacion === "flotar_lento"
                        ? `flotar ${item.datos.animacion === "flotar_lento" ? "4s" : "2.5s"} ease-in-out infinite`
                        : "none",
                  }}
                />
              ) : (
                <span className="text-4xl">{item.nombre}</span>
              )}
            </div>
          )}
          <h2
            className=" text-sm p-1 border rounded-sm text-center uppercase tracking-wide font-bold"
            style={{
              color: rarezas[item.rareza]?.color,
              background: rarezas[item.rareza]?.bg,
            }}
          >
            {rarezas[item.rareza]?.label}
          </h2>
          <h1 className="text-slate-400 text-lg font-bold">{item.nombre}</h1>
          <p className="text-sm text-slate-500">{item.descripcion}</p>
          <div
            onClick={
              !itemComprado(item)
                ? () => handleComprar(item)
                : !itemEquipado(item)
                  ? () => handleEquipar(item)
                  : null
            }
            className="flex justify-center gap-2  text-sm p-2  
          border rounded-sm text-center 
          uppercase tracking-wide font-bold cursor-pointer"
            style={{
              color: itemComprado(item)
                ? "#0a1828"
                : rarezas[item.rareza]?.color,
              background: itemComprado(item)
                ? "#D4A017"
                : rarezas[item.rareza]?.bg,
            }}
          >
            {itemComprado(item) && !itemEquipado(item) && <span>Equipar</span>}
            {itemEquipado(item) && <span>Equipado</span>}
            {!itemComprado(item) && (
              <>
                <Image src={monedasIcon} alt="Monedas" width={16} height={16} />
                {item.precio}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
