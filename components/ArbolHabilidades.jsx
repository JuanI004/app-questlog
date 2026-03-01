"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PestañaHabilidades from "./PestañaHabilidades";

const RAMA_CONFIG = {
  disciplina: {
    label: "Disciplina",
    color: "#D4A017",
    colorRgb: "212,160,23",
    border: "rgba(212,160,23,0.35)",
    bg: "rgba(212,160,23,0.06)",
    glow: "rgba(212,160,23,0.25)",
  },
  concentracion: {
    label: "Concentración",
    color: "#2AABB5",
    colorRgb: "42,171,181",
    border: "rgba(42,171,181,0.35)",
    bg: "rgba(42,171,181,0.06)",
    glow: "rgba(42,171,181,0.25)",
  },
  exploracion: {
    label: "Exploración",
    color: "#22c55e",
    colorRgb: "34,197,94",
    border: "rgba(34,197,94,0.35)",
    bg: "rgba(34,197,94,0.06)",
    glow: "rgba(34,197,94,0.25)",
  },
};

export default function ArbolHabilidades({ session }) {
  const [error, setError] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [habilidadesJugador, setHabilidadesJugador] = useState([]);
  const [pestaña, setPestaña] = useState("disciplina");
  const [nivelJugador, setNivelJugador] = useState();
  useEffect(() => {
    const fetchPlayerLevel = async () => {
      const { data, error } = await supabase
        .from("player")
        .select("nivel")
        .eq("user_id", session.user.id)
        .single();
      if (error) {
        setError(error);
      } else {
        setNivelJugador(data.nivel);
      }
    };
    const fetchHabilidades = async () => {
      const { data, error } = await supabase
        .from("habilidades")
        .select("*")
        .order("nivel_requerido", { ascending: true });
      const { data: habilidadesJugador, error: errorHabilidadesJugador } =
        await supabase
          .from("player_habilidades")
          .select("habilidad_id")
          .eq("user_id", session.user.id);
      if (error) {
        setError(error);
      } else {
        setHabilidades(data);
        setHabilidadesJugador(habilidadesJugador);
      }
    };
    fetchHabilidades();
    fetchPlayerLevel();
  }, [session]);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  async function handleDesbloquear(habilidadId) {
    const { error } = await supabase.rpc("desbloquear_habilidad", {
      p_habilidad_id: habilidadId,
    });
    if (error) {
      setError(error);
      return;
    }
    setDesbloqueadas((prev) => new Set([...prev, habilidadId]));
  }
  return (
    <div className="relative flex flex-col items-center gap-2 p-4 ">
      <h2 className="title uppercase tracking-widest text-[#D4A017] text-2xl">
        Árbol de Habilidades
      </h2>
      <p className="text-slate-400 text-md">
        Gasta monedas para desbloquear nuevas habilidades
      </p>
      <div className="w-full grid md:grid-cols-3 gap-2">
        {Object.entries(RAMA_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setPestaña(key)}
            className="flex-1 p-5 text-lg border border-[#234b72] font-bold uppercase rounded-sm tracking-widest transition-all duration-200 cursor-pointer"
            style={{
              color: pestaña === key ? cfg.color : "#64748b",
              borderColor: pestaña === key ? cfg.color : "#17324d",
              background: pestaña === key ? cfg.bg : "transparent",
              boxShadow: pestaña === key ? `0 0 16px ${cfg.glow}` : "none",
            }}
          >
            {cfg.label}
          </button>
        ))}
      </div>
      {pestaña && (
        <div
          className="h-px w-full mt-2"
          style={{
            background: `linear-gradient(90deg, transparent, ${RAMA_CONFIG[pestaña].color}, transparent)`,
          }}
        />
      )}
      <div className="w-full justify-center flex">
        {pestaña === "disciplina" && (
          <PestañaHabilidades
            habilidades={habilidades.filter((h) => h.rama === "disciplina")}
            habilidadesJugador={habilidadesJugador}
            color={RAMA_CONFIG[pestaña].color}
            colorRgb={RAMA_CONFIG[pestaña].colorRgb}
            nivelJugador={nivelJugador}
            handleDesbloquear={handleDesbloquear}
          />
        )}
        {pestaña === "concentracion" && (
          <PestañaHabilidades
            habilidades={habilidades.filter((h) => h.rama === "concentracion")}
            habilidadesJugador={habilidadesJugador}
            color={RAMA_CONFIG[pestaña].color}
            colorRgb={RAMA_CONFIG[pestaña].colorRgb}
            nivelJugador={nivelJugador}
            handleDesbloquear={handleDesbloquear}
          />
        )}
        {pestaña === "exploracion" && (
          <PestañaHabilidades
            habilidades={habilidades.filter((h) => h.rama === "exploracion")}
            habilidadesJugador={habilidadesJugador}
            color={RAMA_CONFIG[pestaña].color}
            colorRgb={RAMA_CONFIG[pestaña].colorRgb}
            nivelJugador={nivelJugador}
            handleDesbloquear={handleDesbloquear}
          />
        )}
      </div>
      {error && (
        <div className=" text-red-500 px-4 py-2 rounded">
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}
