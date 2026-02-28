"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import xpIcon from "@/public/xp-icon.svg";
import monedasIcon from "@/public/monedas-icon.svg";
import Estudiar from "@/components/Estudiar";
import { useDashboard } from "./layout";
import placeholderImg from "@/public/placeholder.webp";
import ModalRecompensas from "@/components/ModalRecompensas";

const SECTIONS = {
  1: "Estudiar",
  2: "Habilidades",
  3: "Tienda",
};

export default function Dashboard() {
  const { session, player, setPlayer } = useDashboard();
  const [recompensas, setRecompensas] = useState(true);
  const [section, setSection] = useState("1");
  const searchParams = useSearchParams();
  let xpGanado = searchParams.get("xp");
  let monedasGanadas = searchParams.get("monedas");
  return (
    <>
      <div className="flex flex-col my-4 sm:flex-row justify-between w-7/8 gap-4 px-10 lg:w-5/8 py-6 rounded-sm border-[#2a5a8a]  items-center bg-[#060e18]/80 border">
        {xpGanado && monedasGanadas && recompensas ? (
          <ModalRecompensas
            xp={xpGanado}
            monedas={monedasGanadas}
            onConfirm={() => {
              setRecompensas(false);
            }}
          />
        ) : (
          <></>
        )}
        <div className="relative flex items-center gap-4 ">
          <div className="relative  shrink-0 h-20 w-20 border-2 border-[#3977b6] rounded-full  drop-shadow-[0_0_20px_rgba(95,153,245,0.4)]">
            {player?.image_url ? (
              <Image
                src={player.image_url}
                alt="Avatar"
                width={260}
                height={260}
                className="w-full h-full object-cover  rounded-full"
              />
            ) : (
              <Image
                src={placeholderImg}
                alt="Avatar"
                width={260}
                height={260}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-slate-500 uppercase tracking-[4px]">
              Bienvenido de vuelta
            </p>
            <h2 className="title text-[2rem] font-bold text-[#D4A017]">
              {player?.username}
            </h2>
          </div>
        </div>
        <div className="flex  items-center gap-10">
          <div className="flex items-center gap-3">
            <Image src={xpIcon} alt="xp" className="h-12 w-12" />
            <span className="text-xl font-bold text-[#2AABB5]">
              {player?.xp ?? "—"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Image src={monedasIcon} alt="xp" className="h-12 w-12" />
            <span className="text-xl font-bold text-[#D4A017]">
              {player?.monedas ?? "—"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-3   max-h-250 w-7/8 lg:w-5/8 bg-linear-to-br from-[#0d1e30] via-[#0a1828] to-[#060e18]
                      rounded-sm border border-[#2a5a8a]  "
      >
        {Object.entries(SECTIONS).map(([key, value]) => (
          <button
            onClick={() => setSection(key)}
            key={key}
            className={`flex-1 py-4 text-lg font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer
                ${
                  section === key
                    ? "bg-linear-to-b from-[#1a3a60] to-[#0f2340] text-[#F0C040] border-b-2 border-[#F0C040]"
                    : "text-[#64748b] hover:text-[#a08c50] hover:bg-[#0f2340]/50"
                }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div
        className="flex  flex-col max-h-250 w-7/8 p-3 lg:w-5/8 bg-linear-to-br from-[#0d1e30] via-[#0a1828] to-[#060e18]
                      rounded-sm border border-[#2a5a8a] drop-shadow-[0_0_14px_rgba(95,153,245,0.4)]  "
      >
        {section === "1" && <Estudiar session={session} />}
      </div>
    </>
  );
}
