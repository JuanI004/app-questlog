"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import xpIcon from "@/public/xp-icon.svg";
import monedasIcon from "@/public/monedas-icon.svg";
import Estudiar from "@/components/Estudiar";

const SECTIONS = {
  1: "Estudiar",
  2: "Habilidades",
  3: "Tienda",
};

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [section, setSection] = useState("1");
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
            Cargando...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-screen pt-24 pb-5 flex flex-col gap-6 items-center justify-start min-h-screen overflow-scroll">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            player?.arquetipo === "Caballero del Saber"
              ? "url('/bgCaballero.webp')"
              : player?.arquetipo === "Mago del Conocimiento"
                ? "url('/bgMago.webp')"
                : player?.arquetipo === "Elfo Explorador"
                  ? "url('/bgElfo.webp')"
                  : "none",
          backgroundColor: "#0B1C2C",
          filter: "brightness(0.4) saturate(0.8)",
        }}
      />
      <div className="flex flex-col my-4 sm:flex-row justify-between w-7/8 gap-4 px-10 lg:w-5/8 py-6 rounded-sm border-[#2a5a8a]  items-center bg-[#060e18]/80 border">
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
              {player?.xp ?? "—"}
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
        {section === "1" && <Estudiar />}
      </div>
    </div>
  );
}
