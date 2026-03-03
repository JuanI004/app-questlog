"use client";

import Image from "next/image";
import { useState } from "react";
import monedasIcon from "@/public/monedas-icon.svg";
import xpIcon from "@/public/xp-icon.svg";
import Trivia from "./Trivia";

const CATEGORIAS = [
  { id: 9, label: "Cultura General" },
  { id: 17, label: "Ciencia" },
  { id: 18, label: "Computación" },
  { id: 19, label: "Matemáticas" },
  { id: 20, label: "Mitología" },
  { id: 23, label: "Historia" },
  { id: 25, label: "Arte" },
  { id: 27, label: "Animales" },
];

const DIFICULTADES = [
  {
    valor: "easy",
    label: "Fácil",
    color: "#22c55e",
    glow: "#22c55eaa",
    bg: "#22c55e33",
    xp: 5,
    monedas: 3,
  },
  {
    valor: "medium",
    label: "Media",
    color: "#D4A017",
    glow: "#D4A017aa",
    bg: "#d49e1728",
    xp: 10,
    monedas: 6,
  },
  {
    valor: "hard",
    label: "Difícil",
    color: "#ef4444",
    glow: "#ef4444aa",
    bg: "#ef44442f",
    xp: 20,
    monedas: 12,
  },
];

export default function Flashcards({ session }) {
  const [pestaña, setPestaña] = useState("Fácil");
  const [categoriaId, setCategoriaId] = useState(9);
  const [triviaIniciada, setTriviaIniciada] = useState(false);

  function getColorForDifficulty(dificultad) {
    const config = DIFICULTADES.find((d) => d.label === dificultad);
    return config ? config.color : "#64748b";
  }
  function getRecompensaForDifficulty(dificultad) {
    const config = DIFICULTADES.find((d) => d.label === dificultad);
    return config
      ? { xp: config.xp, monedas: config.monedas }
      : { xp: 0, monedas: 0 };
  }
  function getValoresForDifficulty(id) {
    const config = DIFICULTADES.find((d) => d.label === id);
    return config ? config.valor : "easy";
  }
  function handleFinalizarTrivia() {
    setTriviaIniciada(false);
  }
  return !triviaIniciada ? (
    <div className="relative flex flex-col items-center gap-2 p-4 ">
      <h2 className="title uppercase tracking-widest text-[#D4A017] text-2xl">
        Flashcards
      </h2>
      <p className="text-slate-400 text-md">
        Pon a prueba tus conocimientos y gana recompensas
      </p>
      <p className="bg-[#ef44442f] p-2 text-sm rounded-sm border text-center border-[#ef4444] text-[#ef4444]">
        AVISO: Las preguntas solo están disponibles en inglés
      </p>
      <div className="flex flex-col items-start w-full px-4 mt-4 gap-3">
        <p className="uppercase tracking-[4px] pl-1 text-[#a08c50] text-xl text-left">
          Dificultad
        </p>
        <div className="grid md:grid-cols-3 gap-2 w-full">
          {Object.entries(DIFICULTADES).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setPestaña(cfg.label)}
              className="flex flex-col gap-1 p-5 text-lg border border-[#234b72] font-bold uppercase rounded-sm tracking-widest transition-all duration-200 cursor-pointer"
              style={{
                color: pestaña === cfg.label ? cfg.color : "#64748b",
                borderColor: pestaña === cfg.label ? cfg.color : "#17324d",
                background: pestaña === cfg.label ? cfg.bg : "transparent",
                boxShadow:
                  pestaña === cfg.label ? `0 0 16px ${cfg.glow}` : "none",
              }}
            >
              <p>{cfg.label}</p>
              <div className=" text-sm font-medium items-center flex justify-center gap-2">
                <p className="flex gap-2">
                  +{cfg.xp}{" "}
                  <Image src={xpIcon} alt="XP" width={20} height={20} />{" "}
                </p>
                <span>·</span>
                <div className="flex gap-2">
                  +{cfg.monedas}
                  <Image
                    src={monedasIcon}
                    alt="Monedas"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <p className="text-sm text-[#64748b] font-medium lowercase">
                por respuesta
              </p>
            </button>
          ))}
        </div>
        <p className="uppercase tracking-[4px] mt-3 pl-1 text-[#a08c50] text-xl text-left">
          Categoría
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaId(cat.id)}
              className="flex flex-col items-center justify-center gap-1 p-3 border rounded-sm cursor-pointer transition-all duration-200 text-center"
              style={{
                borderColor: categoriaId === cat.id ? "#D4A017" : "#1e3a5a",
                background:
                  categoriaId === cat.id ? "rgba(212,160,23,0.07)" : "#060e18",
                color: categoriaId === cat.id ? "#D4A017" : "#475569",
                boxShadow:
                  categoriaId === cat.id
                    ? "0 0 12px rgba(212,160,23,0.2)"
                    : "none",
              }}
            >
              <span className="text-md md:text-lg uppercase tracking-wide leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row mt-3 w-full items-center justify-between px-4 py-3 border border-[#1e3a5a] rounded-sm ">
          <div className="flex gap-2 items-center">
            <span className="text-slate-400 flex items-center gap-1">
              <p className="font-bold text-white">10</p>
              preguntas
            </span>
            <span className="text-slate-400">·</span>
            <p
              className="font-bold"
              style={{ color: getColorForDifficulty(pestaña) }}
            >
              {pestaña}
            </p>
            <span className="text-slate-400">·</span>
            <p className="text-white font-bold">
              {CATEGORIAS.find((c) => c.id === categoriaId)?.label}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-slate-400">Hasta</p>
            <p className="flex gap-2 text-[#2AABB5] font-bold">
              +{getRecompensaForDifficulty(pestaña).xp * 10}{" "}
              <Image src={xpIcon} alt="XP" width={20} height={20} />{" "}
            </p>
            <span className="text-slate-400">·</span>
            <p className="flex gap-2 text-[#D4A017] font-bold">
              +{getRecompensaForDifficulty(pestaña).monedas * 10}{" "}
              <Image src={monedasIcon} alt="Monedas" width={20} height={20} />
            </p>
          </div>
        </div>
        <button
          onClick={() => setTriviaIniciada(true)}
          className="w-full
                mt-6 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-10 py-5 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
        >
          ⚔ Comenzar Batalla
        </button>
      </div>
    </div>
  ) : (
    <Trivia
      categoriaNombre={CATEGORIAS.find((c) => c.id === categoriaId)?.label}
      categoriaId={categoriaId}
      dificultad={getValoresForDifficulty(pestaña)}
      colorDificultad={getColorForDifficulty(pestaña)}
      handleFinalizarTrivia={handleFinalizarTrivia}
    />
  );
}
