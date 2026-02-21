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

function getTitulo(nivel) {
  if (nivel >= 50)
    return {
      titulo: "Leyenda Académica",
      color: "color: #f5eedc;",
    };
  if (nivel >= 30) return { titulo: "Maestro del Saber", color: "#a78bfa" };
  if (nivel >= 20) return { titulo: "Sabio", color: "#2AABB5" };
  if (nivel >= 10) return { titulo: "Erudito", color: "#6ee7b7" };
  if (nivel >= 5) return { titulo: "Aprendiz", color: "#F0C040" };
  return { titulo: "Novato", color: "#64748b" };
}

export default function Perfil() {
  const [session, setSession] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { titulo, color } = getTitulo(player?.nivel ?? 1);
  const xp = player?.xp ?? 0;
  const xpBase = (player?.nivel ?? 1) * 100;
  const xpActual = xp % xpBase;
  const porcentaje = Math.min((xpActual / xpBase) * 100, 100);
  const niveles = [5, 10, 20, 30, 50];
  const proximo = niveles.find((n) => n > (player?.nivel ?? 1)) || "—";
  const { titulo: proximoTitulo, color: proximoColor } = getTitulo(proximo);
  const progreso = Math.min(((player?.nivel ?? 1) / proximo) * 100, 100);
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
    <div className="relative w-screen pt-20 pb-5 flex flex-col items-center justify-start min-h-screen overflow-scroll">
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
          <div className="relative shrink-0 h-60 w-60 border-3 border-[#3977b6] rounded-full  drop-shadow-[0_0_20px_rgba(95,153,245,0.4)]">
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
            <span
              className="title absolute bg-[#060e18] px-3  h-10 flex items-center justify-center
             text-[#F0C040] rounded-sm border-2 border-[#D4A017] 
             bottom-2 right-2 "
            >
              LVL {player?.nivel}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 w-full ">
            <div
              className="flex items-center uppercase tracking-[4px] gap-4 text-xl"
              style={
                titulo !== "Leyenda Académica"
                  ? { color }
                  : {
                      color: "#f5eedc",
                      backgroundImage:
                        "linear-gradient(45deg, #f5eedc , #ebddc6 25%, #d4bf9f 50%, #a68c6c 75%, #755f3f 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
              }
            >
              <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
              {titulo}
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
                {player?.xp || 0}/{xpBase} XP
              </p>
            </div>
            <div className="w-full h-3 bg-[#060e18] rounded-full border border-[#2a5a8a] overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${porcentaje}%`,
                  background: `linear-gradient(90deg,rgba(6, 0, 97, 1) 0%, rgba(9, 9, 121, 1) 0%, rgba(0, 212, 255, 1) 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 w-7/8 lg:w-6/8 items-center gap-3 mb-5 ">
        <StatCard
          label="Nivel"
          value={player?.nivel ?? 1}
          color="#9264f1"
          icon={nivelIcon}
        />
        <StatCard
          label="XP Total"
          value={player?.xp ?? 0}
          color="#2AABB5"
          icon={xpIcon}
        />
        <StatCard
          label="Racha"
          color="#FE6A35"
          value={`${player?.racha_dias ?? 0}d`}
          icon={rachaIcon}
        />
        <StatCard
          label="Monedas"
          value={player?.monedas ?? 0}
          color="#D4A017"
          icon={monedasIcon}
        />
      </div>
      <div className="w-7/8 lg:w-6/8  bg-[#060e18]/95 border border-[#2a5a8a]  hover:border-[#F0C040]/40 py-8 px-7 rounded-sm">
        {player?.nivel < 50 ? (
          <>
            <div className="flex items-center mb-3">
              <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
              <h2 className="text-lg text-[#F0C040] uppercase tracking-[4px] mx-3">
                PRÓXIMO TÍTULO
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <h2
                className="title text-2xl tracking-widest text-[#F0C040] mb-3 "
                style={
                  proximoTitulo !== "Leyenda Académica"
                    ? { color: proximoColor }
                    : {
                        color: "#f5eedc",
                        backgroundImage:
                          "linear-gradient(45deg, #f5eedc , #ebddc6 25%, #d4bf9f 50%, #a68c6c 75%, #755f3f 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                }
              >
                {proximoTitulo}
              </h2>
              <p className="text-slate-400">Nivel {proximo}</p>
            </div>
            <div className="w-full h-2 bg-[#060e18] rounded-full border border-[#2a5a8a] overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progreso}%`,
                  background: `linear-gradient(90deg, ${proximoColor}60, ${proximoColor})`,
                }}
              />
            </div>

            <p className="text-slate-400">
              Nivel {player?.nivel} de {proximo} — {proximo - player?.nivel}{" "}
              niveles restantes
            </p>
          </>
        ) : (
          <>
            <div className="w-7/8 lg:w-6/8  bg-[#060e18]/95 border border-[#2a5a8a]  hover:border-[#F0C040]/40 py-8 px-7 rounded-sm">
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
                  <span className="w-3 h-3 bg-[#F0C040] rotate-45" />
                  <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
                </div>
                <h2
                  className="title text-[2rem] tracking-widest text-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #f5eedc, #ebddc6 25%, #d4bf9f 50%, #a68c6c 75%, #755f3f 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Leyenda Académica
                </h2>
                <p className="text-[#a08c50] text-lg uppercase tracking-[4px] text-center">
                  Has alcanzado el título máximo
                </p>
                <p className="text-slate-500 text-md text-center max-w-xs">
                  No hay más títulos por conquistar.
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="h-px w-12 bg-linear-to-r from-transparent to-[#D4A017]/60" />
                  <span className="w-2 h-2 bg-[#D4A017] rotate-45" />
                  <span className="h-px w-12 bg-linear-to-l from-transparent to-[#D4A017]/60" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
