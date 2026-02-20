"use client";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/StatCard";
import placeholderImg from "@/public/placeholder.webp";
import nivelIcon from "@/public/nivel-icon.svg";
import xpIcon from "@/public/xp-icon.svg";
import rachaIcon from "@/public/racha-icon.svg";
import monedasIcon from "@/public/monedas-icon.svg";

import Image from "next/image";

export default function Perfil() {
  const [session, setSession] = useState(null);
  const [errores, setErrores] = useState({});
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data, error }) => {
      if (error || !data.session) {
        router.push("/iniciar-sesion");
        return;
      }
      setSession(data.session);
      const { data: p } = await supabase
        .from("player")
        .select("*")
        .eq("user_id", data.session.user.id)
        .single();
      setPlayer(p);
      console.log(p);
      setLoading(false);
    });
  }, [router]);
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#060e18]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: "#D4A017", borderTopColor: "transparent" }}
          />
          <p className="text-[#a08c50] text-xs tracking-widest uppercase">
            Cargando aventurero...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`w-screen pt-20 flex flex-col  items-center justify-center h-screen  overflow-scroll bg-cover bg-center bg-[#0B1C2C] 
    ${
      player?.arquetipo === "Caballero del Saber" &&
      "bg-[url('@/public/bgCaballero.webp')] "
    }${
      player?.arquetipo === "Mago del Tiempo" &&
      "bg-[url('@/public/bgMago.webp')] "
    }${
      player?.arquetipo === "Elfo Explorador" &&
      "bg-[url('@/public/bgElfo.webp')] "
    }`}
    >
      <div
        className="flex  m-5 flex-col max-h-250 w-7/8 lg:w-6/8 bg-linear-to-br from-[#0d1e30] via-[#0a1828] to-[#060e18]
                      rounded-sm border border-[#2a5a8a] drop-shadow-[0_0_14px_rgba(95,153,245,0.7)]  "
      >
        <span className="absolute top-0 w-full h-0.75 bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]" />
        <div className="flex mx-5 py-5  border-b border-[#2a5a8a] justify-center items-center gap-3">
          <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
          <span className="w-3 h-3 bg-[#2AABB5] rotate-45" />
          <h1 className="title text-2xl tracking-widest text-[#F0C040]">
            Ficha de Aventurero
          </h1>
          <span className="w-3 h-3 bg-[#2AABB5] rotate-45" />
          <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
        </div>
        <div className="flex flex-col md:flex-row  items-center p-10 gap-10">
          <div className="relative overflow-hidden shrink-0 h-60 w-60 border-3 border-[#3977b6] rounded-full  drop-shadow-[0_0_20px_rgba(95,153,245,0.4)]">
            {player?.image_url ? (
              <Image
                src={player.image_url}
                alt="Avatar"
                width={260}
                height={260}
                className="w-full h-full object-cover"
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
          <div className="flex flex-col items-center md:items-start gap-2 w-full ">
            <div className="flex items-center uppercase tracking-[4px] gap-4 text-xl text-[#a08c50]">
              <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
              Novato
              <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
            </div>
            <h2 className="title text-[2.5rem] text-[#F0C040] mt-6 md:mt-0 drop-shadow-[0_0_20px_rgba(212,160,23,0.5)]">
              {player?.username || "Aventurero sin nombre"}
            </h2>
            <h3 className="text-xl uppercase tracking-[4px] text-[#F0C040] mt-2">
              {player?.arquetipo || "Arquetipo desconocido"}
            </h3>
            <div className="flex justify-between items-center mt-3 w-full">
              <p className="text-[#2a5a8a] text-bold uppercase tracking-[4px] text-lg ">
                Experiencia
              </p>
              <p className="text-slate-500  tracking-widest">
                {player?.xp || 0}/100 XP
              </p>
            </div>
            <span className="w-full h-3 rounded-full border border-[#2a5a8a]" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 w-7/8 lg:w-6/8 items-center gap-3 mb-10 ">
        <StatCard label="Nivel" value={player?.nivel ?? 1} icon={nivelIcon} />
        <StatCard label="XP Total" value={player?.xp ?? 0} icon={xpIcon} />
        <StatCard
          label="Racha"
          value={`${player?.racha_dias ?? 0}d`}
          icon={rachaIcon}
        />
        <StatCard
          label="Monedas"
          value={player?.monedas ?? 0}
          icon={monedasIcon}
        />
      </div>
    </div>
  );
}
