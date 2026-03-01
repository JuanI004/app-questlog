"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import xpIcon from "@/public/xp-icon.svg";
import monedasIcon from "@/public/monedas-icon.svg";

export default function ModalRecompensas({ xp, monedas, onConfirm, bonus }) {
  const [visible, setVisible] = useState(false);
  const [xpVisible, setXpVisible] = useState(false);
  const [monedasVisible, setMonedasVisible] = useState(false);
  const [botonVisible, setBotonVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setXpVisible(true), 400);
    const t3 = setTimeout(() => setMonedasVisible(true), 700);
    const t4 = setTimeout(() => setBotonVisible(true), 1000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div
        className="flex flex-col gap-2 w-full max-w-md h-xl mx-4"
        style={{
          boxShadow: "0 0 40px rgba(0,0,0,0.8)",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.97)",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="flex gap-4 items-center justify-center mb-4">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, transparent, #D4A017)`,
            }}
          />
          <span className="w-2.5 h-2.5 bg-[#D4A017] rotate-45" />
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to left, transparent, #D4A017)`,
            }}
          />
        </div>
        <p className="text-lg uppercase tracking-[4px] text-center  text-[#F0C040] ">
          Sesion Completada
        </p>
        <h2 className="title uppercase text-[4rem] text-center  text-[#F0C040] drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]">
          ¡Victoria!
        </h2>
        <div
          className="flex w-full p-4 border border-[#2AABB5]
         bg-[#060e18]/80 rounded-sm mx-auto gap-8 items-center mb-2 "
          style={{
            opacity: xpVisible ? 1 : 0,
            transform: xpVisible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s ease-out",
            boxShadow: xpVisible ? "0 0 20px rgba(42,171,181,0.08)" : "none",
          }}
        >
          <Image src={xpIcon} alt="XP Icon" className="w-14 h-14" />

          <div className="flex-col  text-slate-400 text-xs uppercase tracking-[4px]">
            <p>Experiencia Ganada</p>

            <h2 className="title text-[2rem] text-[#2AABB5] drop-shadow-[0_0_14px_rgba(42,171,181,0.7)]">
              <span className="text-[2rem]">+{xp}</span>{" "}
              <span className="text-lg">XP</span>
            </h2>
            {bonus === "true" && (
              <div className="flex flex-col items-center">
                <p className="text-[#f15c05] text-center">
                  Racha de 7 dias: <span className="text-lg">×2</span>{" "}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex w-full p-4 border border-[#D4A017]
         bg-[#060e18]/80 rounded-sm mx-auto gap-8 mb-4 items-center "
          style={{
            opacity: monedasVisible ? 1 : 0,
            transform: monedasVisible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s ease-out",
          }}
        >
          <Image src={monedasIcon} alt="Monedas Icon" className="w-14 h-14" />

          <div className="flex-col  text-slate-400 text-xs uppercase tracking-[4px]">
            <p>Monedas Ganadas</p>

            <h2 className="title  text-[#D4A017] drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]">
              <span className="text-[2rem]">+{monedas}</span>{" "}
              <span className="text-lg">Monedas</span>
            </h2>
            {bonus === "true" && (
              <div className="flex flex-col items-center">
                <p className="text-[#f15c05] text-center">
                  Racha de 7 dias: <span className="text-lg">×2</span>{" "}
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          className="
                mb-4  text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-10 py-5 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
          style={{
            opacity: botonVisible ? 1 : 0,
            transform: botonVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
          onClick={onConfirm}
        >
          Reclamar Recompensas
        </button>
        <div className="flex gap-4 items-center justify-center">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, transparent, #D4A017)`,
            }}
          />
          <span className="w-2.5 h-2.5 bg-[#D4A017] rotate-45" />
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to left, transparent, #D4A017)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
