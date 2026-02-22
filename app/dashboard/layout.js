"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";

export const DashboardContext = createContext(null);

export function useDashboard() {
  return useContext(DashboardContext);
}

export default function DashboardLayout({ children }) {
  const [session, setSession] = useState(null);
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
    <DashboardContext.Provider value={{ session, player, setPlayer }}>
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
        {children}
      </div>
    </DashboardContext.Provider>
  );
}
