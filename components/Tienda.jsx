"use client";

import { useEffect, useState } from "react";
import PestañaHabilidades from "./PestañaHabilidades";
import PestañaTienda from "./PestañaTienda";
import { supabase } from "@/lib/supabase";
import { useDashboard } from "@/app/dashboard/layout";

const CATEGORIAS = {
  titulo: {
    label: "Títulos",
    descripcion: "Aparece debajo de tu nombre",
  },
  marco: {
    label: "Marcos",
    descripcion: "Rodea tu imagen de perfil",
  },
  fondo: {
    label: "Fondos",
    descripcion: "Banner del dashboard",
  },
  mascota: {
    label: "Mascotas",
    descripcion: "Compañero en tu perfil",
  },
};

const RAREZAS = {
  comun: {
    label: "Común",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    glow: "rgba(148,163,184,0.2)",
  },
  raro: {
    label: "Raro",
    color: "#3977b6",
    bg: "rgba(57,119,182,0.08)",
    glow: "rgba(57,119,182,0.25)",
  },
  epico: {
    label: "Épico",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    glow: "rgba(168,85,247,0.25)",
  },
  legendario: {
    label: "Legendario",
    color: "#D4A017",
    bg: "rgba(212,160,23,0.08)",
    glow: "rgba(212,160,23,0.3)",
  },
};

export default function Tienda() {
  const { setPlayer, session } = useDashboard();
  const [pestaña, setPestaña] = useState("titulo");
  const [filtroRareza, setFiltroRareza] = useState("todas");
  const [items, setItems] = useState([]);
  const [itemsComprados, setItemsComprados] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [tieneComerciante, setTieneComerciante] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from("tienda_items")
        .select("*")
        .order("nombre", { ascending: true });
      if (error) {
        setMensaje({ error: error.message });
        setLoading(false);
        return;
      }
      setItems(data);
    }
    async function fetchHabilidades() {
      const { data } = await supabase
        .from("player_habilidades")
        .select("habilidades(nombre)")
        .eq("user_id", session.user.id);
      setTieneComerciante(
        data?.some((h) => h.habilidades.nombre === "Comerciante") ?? false,
      );
    }
    async function fetchItemsComprados() {
      const { data, error } = await supabase.from("player_items").select("*");
      if (error) {
        setMensaje({ error: error.message });
        setLoading(false);
        return;
      }
      setItemsComprados(data);
      setLoading(false);
    }
    fetchHabilidades();
    fetchItems();
    fetchItemsComprados();
  }, []);
  const ORDEN_RAREZA = { comun: 0, raro: 1, epico: 2, legendario: 3 };
  const handleComprar = async function (item) {
    const { data, error } = await supabase.rpc("comprar_item", {
      p_item_id: item.id,
    });
    if (error) {
      setMensaje({ error: error.message });
      return;
    }
    setMensaje({ success: "¡Item comprado con éxito!" });
    setItemsComprados((prev) => [
      ...prev,
      { item_id: item.id, equipado: false },
    ]);
    let precio = item.precio;
    if (tieneComerciante) {
      precio = Math.floor(precio * 0.9);
    }
    setPlayer((prev) => ({ ...prev, monedas: prev.monedas - precio }));
    return;
  };
  const handleEquipar = async function (item) {
    const { data, error } = await supabase.rpc("equipar_item", {
      p_item_id: item.id,
    });
    if (error) {
      setMensaje({ error: error.message });
      return;
    }
    setMensaje({ success: "¡Item equipado con éxito!" });
    setItemsComprados((prev) =>
      prev.map((comprado) =>
        comprado.item_id === item.id
          ? { ...comprado, equipado: true }
          : { ...comprado, equipado: false },
      ),
    );
  };
  const itemsFiltrados = items
    .filter((i) => i.categoria === pestaña)
    .filter((i) => filtroRareza === "todas" || i.rareza === filtroRareza)
    .sort((a, b) => ORDEN_RAREZA[a.rareza] - ORDEN_RAREZA[b.rareza]);
  return (
    <div className="relative flex flex-col items-center gap-4 p-4 ">
      <h2 className="title uppercase tracking-widest text-[#D4A017] text-2xl">
        Tienda
      </h2>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-4  gap-2">
        {Object.entries(CATEGORIAS).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setPestaña(key)}
            className="flex-1 p-5 text-lg border border-[#234b72] bg-[#060e18] font-bold uppercase rounded-sm tracking-widest transition-all duration-200 cursor-pointer"
            style={{
              color: pestaña === key ? "#D4A017" : "#64748b",
              borderColor: pestaña === key ? "#D4A017" : "#17324d",
              background:
                pestaña === key ? "rgba(212,160,23,0.06)" : "transparent",
              boxShadow:
                pestaña === key ? `0 0 16px rgba(212,160,23,0.25)` : "none",
            }}
          >
            {cfg.label}
          </button>
        ))}
      </div>
      {pestaña && (
        <div className="flex gap-2 w-full items-center">
          <p className="text-lg text-slate-400 uppercase tracking-wide">
            {CATEGORIAS[pestaña].descripcion}
          </p>
          <div className="h-px flex-1 bg-[#17324d]" />
          <div className="flex gap-1">
            {["todas", "comun", "raro", "epico", "legendario"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFiltroRareza(r)}
                className="text-xs uppercase tracking-widest px-2 py-1 rounded-sm border cursor-pointer transition-all"
                style={{
                  borderColor:
                    filtroRareza === r
                      ? r === "todas"
                        ? "#D4A017"
                        : RAREZAS[r]?.color
                      : "#17324d",
                  color:
                    filtroRareza === r
                      ? r === "todas"
                        ? "#D4A017"
                        : RAREZAS[r]?.color
                      : "#334155",
                  background:
                    filtroRareza === r
                      ? r === "todas"
                        ? "rgba(212,160,23,0.06)"
                        : RAREZAS[r]?.bg
                      : "transparent",
                }}
              >
                {r === "todas" ? "Todas" : RAREZAS[r].label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="w-full h-100 flex items-center justify-center ">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{ borderColor: "#D4A017", borderTopColor: "transparent" }}
            />
          </div>
        </div>
      ) : (
        <PestañaTienda
          filtroRareza={filtroRareza}
          rarezas={RAREZAS}
          categoria={pestaña}
          items={itemsFiltrados}
          itemsComprados={itemsComprados}
          mensaje={mensaje}
          handleComprar={handleComprar}
          handleEquipar={handleEquipar}
          tieneComerciante={tieneComerciante}
        />
      )}
      {mensaje && (
        <div
          className={`px-4 py-2 rounded ${mensaje.error ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
          {mensaje.error || mensaje.success}
        </div>
      )}
    </div>
  );
}
