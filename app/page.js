"use client";
import Image from "next/image";
import bannerImg from "@/public/banner.png";
import arrowDown from "@/public/arrow-down.svg";
import misionesImg from "@/public/misiones.png";
import logrosImg from "@/public/logros.png";
import habilidadesImg from "@/public/habilidades.png";
import logoImg from "@/public/logo.png";
import swordImg from "@/public/sword.png";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: misionesImg,
    title: "Misiones Diarias",
    desc: "Cada tarea es una misión. Completalas y ganás XP real.",
  },
  {
    icon: logrosImg,
    title: "Logros & Rangos",
    desc: "Desbloqueá insignias épicas al alcanzar tus metas académicas.",
  },
  {
    icon: habilidadesImg,
    title: "Árbol de Habilidades",
    desc: "Elegí tu especialización y subí de nivel tus conocimientos.",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;
  const fadeStart = viewportHeight * 0.4;
  const fadeEnd = viewportHeight * 0.8;
  const swordOpacity =
    scrollY <= fadeStart
      ? 1
      : scrollY >= fadeEnd
        ? 0
        : 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
  return (
    <>
      <div className="flex items-center justify-center bg-[#0B1C2C]">
        <Image
          src={bannerImg}
          alt="Banner image"
          className="absolute pt-12 w-screen h-screen object-cover 
        brightness-35"
        ></Image>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e18] via-transparent to-transparent z-[1]" />

        <div
          className="pt-12 px-14 lg:px-0 relative max-w-220 flex items-center justify-center
        md:justify-normal h-screen w-screen text-center md:text-left  "
        >
          <div className="relative z-10 max-w-220 flex flex-col items-center md:items-start">
            <h2 className="text-white text-5xl w-full md:w-4/5 font-bold">
              Estudiar ya no es una tarea.
              <br />
              <span className="text-[#F0C040] drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]">
                {" "}
                Es una Quest
              </span>
            </h2>
            <p className="text-slate-300 mt-4">
              Sube de nivel, desbloquea logros y domina tus habilidades.
            </p>
            <button
              className="
                mt-3 text-sm font-bold tracking-widest uppercase text-[#0a1828]
                bg-gradient-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-3 rounded-[4px] shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
            >
              Comenzar Aventura
            </button>
          </div>
          <div
            className="hidden md:block w-28 absolute right-14 top-16  h-auto pointer-events-none"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              opacity: swordOpacity,
              transition: "opacity 0.05s linear",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={swordImg}
              alt="Sword"
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(42,171,181,0.4)]"
            />
          </div>
          <a href="#info" className="z-20">
            <Image
              src={arrowDown}
              alt="scroll down"
              className="absolute bottom-3 left-1/2 transform cursor-pointer -translate-x-1/2 
          w-8 h-auto animate-bounce "
            />
          </a>
        </div>
      </div>
      <div
        id="info"
        className="relative flex flex-col justify-center items-center w-screen min-h-screen bg-[#0B1C2C] overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#060e18] via-transparent to-transparent z-[1]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg, #D4A017 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div></div>
        <Image
          src={logoImg}
          alt="Logo de QuestLog"
          className="w-48 h-auto mt-20 pb-5 drop-shadow-[0_0_20px_rgba(212,160,23,0.5)] z-2"
        />
        <div className="flex items-center gap-3 z-2">
          <span className="h-px w-16 bg-linear-to-r from-transparent to-[#D4A017]/60" />
          <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
          <span className="w-1.5 h-1.5 bg-[#2AABB5] rotate-45" />
          <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
          <span className="h-px w-16 bg-linear-to-l from-transparent to-[#D4A017]/60" />
        </div>
        <h2 className=" pt-5 text-3xl text-center font-bold text-[#F0C040] drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]  z-2">
          Bienvenidos a QuestLog
        </h2>

        <p className="text-slate-300 mt-6 max-w-xl text-center px-4 z-2">
          En QuestLog, el conocimiento es poder y cada día es una nueva
          aventura. Transformá tus tareas en misiones, tus metas en logros y tu
          disciplina en experiencia. Subí de nivel como estudiante, desbloqueá
          habilidades y construí tu propio camino hacia la maestría.
        </p>
        <p className="text-[#D4A017] mt-4 font-bold">
          Tu aventura académica comienza aquí.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full p-6 max-w-220">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col justify-center items-center p-5 bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] text-[#a08c50] z-10
              hover:border hover:border-[#F0C040] hover:text-[#F0C040] transition-all delay-100 
             hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.2)] hover:scale-105
              "
            >
              <Image
                src={f.icon}
                alt={f.title}
                className="w-20 h-20 mb-2 drop-shadow-[0_0_14px_rgba(95,153,245,0.7)]"
              />
              <h3 className="font-cinzel text-sm font-bold text-[#F0C040] tracking-wide">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed text-center">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
