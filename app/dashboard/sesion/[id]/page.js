"use client";
import InputDashboard from "@/components/InputDashboard";
import IntroScreen from "@/components/IntroScreen";
import ModalAbandonar from "@/components/ModalAbandonar";
import { supabase } from "@/lib/supabase";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PRIORIDADES = [
  {
    valor: "baja",
    label: "Baja",
    color: "#2AABB5",
    colorRgb: "42,171,181",
    bg: "rgba(42,171,181,0.06)",
    border: "rgba(42,171,181,0.3)",
  },
  {
    valor: "media",
    label: "Media",
    color: "#D4A017",
    colorRgb: "212,160,23",
    bg: "rgba(212,160,23,0.06)",
    border: "rgba(212,160,23,0.3)",
  },

  {
    valor: "alta",
    label: "Alta",
    color: "#ef4444",
    colorRgb: "239,68,68",
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.3)",
  },
];

const MENSAJES_VICTORIA = [
  "¡Enemigo derrotado!",
  "¡Excelente trabajo!",
  "¡Imparable!",
  "¡Así se hace, guerrero!",
  "¡Un paso más hacia la victoria!",
  "¡Otro obstáculo eliminado!",
  "¡Magnífico!",
  "¡Objetivo cumplido!",
];

export default function SesionPage({ params }) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [sesion, setSesion] = useState(null);
  const router = useRouter();
  const [segundos, setSegundos] = useState(null);
  const [ronda, setRonda] = useState(1);
  const [fase, setFase] = useState("batalla");
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [prioridad, setPrioridad] = useState();
  const [introTerminada, setIntroTerminada] = useState(false);
  const [mensajeVictoria, setMensajeVictoria] = useState("");
  const [modalAbandonar, setModalAbandonar] = useState(false);
  const [sesionTerminada, setSesionTerminada] = useState(false);
  const timerColor = fase === "descanso" ? "#2AABB5" : "#D4A017";
  const timerColorRgb = fase === "descanso" ? "42,171,181" : "212,160,23";
  let tareasHechas = tareas.filter((t) => t.completada).length;

  useEffect(() => {
    supabase
      .from("sesiones")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data || data.finalizada_at) {
          router.push("/dashboard");
          return;
        }
        setSesion(data);
        setSegundos(data.estudio_min * 60);
        setLoading(false);
      });
  }, [id, router]);
  useEffect(() => {
    if (!sesionTerminada) return;
    async function finalizarSesion() {
      const { data, error } = await supabase.rpc("finalizar_sesion", {
        p_sesion_id: id,
      });
      console.log("data completa:", JSON.stringify(data));
      console.log("error:", error);
      router.push(
        `/dashboard?xp=${data.xp_ganado}&monedas=${data.monedas_ganadas}`,
      );
    }
    finalizarSesion();
  }, [sesionTerminada]);
  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          if (fase === "batalla") {
            const audio = new Audio("/bell.mp3");
            audio.play();
            if (ronda >= sesion.cantidad_sesiones) {
              setSesionTerminada(true);
              return 0;
            }
            setFase("descanso");
            return sesion.descanso_min * 60;
          } else {
            const audio = new Audio("/bell.mp3");
            audio.play();
            setFase("batalla");
            setRonda((prevRonda) => prevRonda + 1);
            return sesion.estudio_min * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [segundos, fase, ronda]);
  async function cancelarSesion() {
    await supabase
      .from("sesiones")
      .update({ cancelada: true, finalizada_at: new Date().toISOString() })
      .eq("id", id);
    router.push("/dashboard");
  }
  function toggleTarea(id) {
    setTareas((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (!t.completada) {
            const mensaje =
              MENSAJES_VICTORIA[
                Math.floor(Math.random() * MENSAJES_VICTORIA.length)
              ];
            setMensajeVictoria(mensaje);
            setTimeout(() => setMensajeVictoria(null), 2000);
          }
          return { ...t, completada: !t.completada };
        }
        return t;
      }),
    );
  }
  function eliminarTarea(id) {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  const tareasOrdenadas = [...tareas].sort((a, b) => {
    if (a.completada !== b.completada) return a.completada ? 1 : -1;
    const orden = { alta: 0, media: 1, baja: 2 };
    return orden[a.prioridad] - orden[b.prioridad];
  });
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
    <>
      {!introTerminada && (
        <IntroScreen
          materia={sesion.materia}
          onDone={() => setIntroTerminada(true)}
        />
      )}
      <div
        className="flex mt-4 sm:flex-row justify-between w-7/8 gap-4 px-10 lg:w-5/8 py-6 rounded-sm
     border-[#2a5a8a]  items-center bg-[#060e18]/80 border"
      >
        <div className="relative flex-col items-center gap-4 ">
          <p className="text-slate-500 uppercase tracking-[4px]">
            Sesión activa
          </p>
          <h2 className="title text-[2rem] uppercase font-bold text-[#D4A017]">
            {sesion.materia}
          </h2>
        </div>
        <div className="relative flex-col items-center text-right gap-4 ">
          <p className="text-slate-500 uppercase tracking-[4px]">
            Ronda {ronda}/{sesion.cantidad_sesiones}
          </p>
          <div className="flex gap-3 mt-4 items-center justify-center">
            {Array.from({ length: sesion.cantidad_sesiones }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 border border-[#2a5a8a] rotate-45 ${
                  i + 1 === ronda
                    ? "bg-[#D4A017] drop-shadow-[0_0_5px_rgba(212,160,23,0.9)]"
                    : "bg-[#0c1a29]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-8 w-7/8 lg:w-5/8  ">
        <div className="flex flex-col gap-4">
          <div
            className={`relative not-visited:flex flex-col justify-center items-center  w-full h-50 p-5rounded-sm
     border-[#2a5a8a] bg-linear-to-br from-[#0d1e30] via-[#0a1828] overflow-hidden to-[#060e18] border`}
          >
            <div
              className="absolute w-full h-full "
              style={{
                background: `linear-gradient(180deg, rgba(${timerColorRgb},0.06) 0%, transparent 100%)`,
              }}
            ></div>
            <p
              className="w-full   text-center   uppercase tracking-[4px]"
              style={{ color: timerColor, borderColor: timerColor }}
            >
              {" "}
              — &nbsp; {fase === "descanso" ? "DESCANSO" : "BATALLA"} &nbsp; —
            </p>

            <div
              className=" flex  gap-4 w-full px-6 items-center 
             "
              style={{
                borderColor: timerColor,
              }}
            >
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, transparent, ${timerColor})`,
                }}
              />
              <span
                className=" title text-[4rem] uppercase font-bold"
                style={{
                  color: timerColor,
                }}
              >
                {segundos !== null
                  ? `${Math.floor(segundos / 60)
                      .toString()
                      .padStart(
                        2,
                        "0",
                      )}:${(segundos % 60).toString().padStart(2, "0")}`
                  : "00:00"}
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to left, transparent, ${timerColor})`,
                }}
              />
            </div>
          </div>
          <div
            className={`relative not-visited:flex flex-col justify-center items-center  w-full aspect-video rounded-sm
     border-[#2a5a8a] bg-linear-to-br from-[#0d1e30] via-[#0a1828] overflow-hidden to-[#060e18] border`}
          >
            <p className="text-slate-500 text-xl">Juego próximamente...</p>
          </div>
        </div>

        <div
          className="relative flex flex-col  overflow-scroll  w-full  rounded-sm
     border-[#2a5a8a] bg-linear-to-br from-[#10253b] via-[#0d1e31] to-[#060f1a] border"
        >
          <div className="flex flex-col p-4">
            <div className="flex gap-4  items-center ]">
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to right, transparent, #D4A017)`,
                }}
              />
              <p className=" title text-xl text-[#D4A017] tracking-[4px] uppercase ">
                Divide y vencerás
              </p>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(to left, transparent, #D4A017)`,
                }}
              />
            </div>
            <p className="text-sm text-center text-slate-400">
              Parte al enemigo en pedazos. Una tarea a la vez
            </p>
            {tareas.length > 0 && (
              <div className="relative flex gap-4 items-center justify-center ">
                <span className="w-4/5 bg-[#0a1727]  h-1 rounded-full "></span>
                <span
                  className="absolute left-4 bg-[#D4A017] max-w-4/5 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(tareasHechas / tareas.length) * 100}%` }}
                ></span>
                <p className="text-slate-400 text-xs">
                  {tareasHechas} / {tareas.length}
                </p>
              </div>
            )}
          </div>

          <span className="px-4 h-px w-11/12 bg-[#2a5a8a] mx-auto" />
          <div className="p-4 flex flex-col gap-2 ">
            <div className="grid grid-cols-3 gap-4  items-center">
              {PRIORIDADES.map((p) => (
                <button
                  key={p.valor}
                  onClick={() => setPrioridad(p.valor)}
                  className="border rounded-sm uppercase cursor-pointer text-xs
                   tracking-wide py-0.5"
                  style={{
                    background: prioridad === p.valor ? p.bg : "transparent",
                    borderColor: prioridad === p.valor ? p.border : "#2a5a8a",
                    color: prioridad === p.valor ? p.color : "#64748b",
                    boxShadow:
                      prioridad === p.valor
                        ? `0 0 8px rgba(${p.colorRgb},0.2)`
                        : "none",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 h-10 items-center justify-center">
              <InputDashboard
                label=""
                value={nuevaTarea}
                onChange={setNuevaTarea}
                placeholder="Nueva tarea..."
              />
              <button
                onClick={() => {
                  if (
                    nuevaTarea.trim() === "" ||
                    fase === "descanso" ||
                    prioridad === undefined
                  )
                    return;
                  setTareas((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      texto: nuevaTarea.trim(),
                      prioridad,
                      completada: false,
                    },
                  ]);
                  setPrioridad();
                  setNuevaTarea("");
                }}
                className="px-4 py-2.5 mt-3 border border-[#2a5a8a] bg-transparent text-[#a08c50]  
                hover:bg-[#060e18] hover:text-[#D4A017] cursor-pointer font-bold text-xl text-center rounded-sm"
              >
                +
              </button>
            </div>
          </div>
          {tareas.length === 0 ? (
            <div className="flex flex-col w-full h-full justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                fill="#2a5a8a"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM68,188a12,12,0,1,1,12-12A12,12,0,0,1,68,188Zm0-48a12,12,0,1,1,12-12A12,12,0,0,1,68,140Zm0-48A12,12,0,1,1,80,80,12,12,0,0,1,68,92Zm124,92H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z"></path>
              </svg>
              <h2 className="text-[#2a5a8a] font-bold uppercase tracking-widest text-lg">
                Sin Objetivos
              </h2>
              <p className="text-[#2a5a8a] text-sm">
                Agrega nuevas tareas para comenzar
              </p>
            </div>
          ) : (
            <>
              <ul className="relative flex flex-col w-full gap-2 px-4 py-3 ">
                {tareasOrdenadas.map((tarea, index) => (
                  <li
                    key={index}
                    className="p-2 rounded-sm border flex  group justify-between"
                    style={{
                      background: tarea.completada
                        ? "rgba(30,40,30,0.4)"
                        : PRIORIDADES.find((p) => p.valor === tarea.prioridad)
                            ?.bg,
                      borderColor: tarea.completada
                        ? "#434d5a"
                        : PRIORIDADES.find((p) => p.valor === tarea.prioridad)
                            ?.border,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-full w-1 rounded-sm"
                        style={{
                          backgroundColor: tarea.completada
                            ? "#434d5a"
                            : PRIORIDADES.find(
                                (p) => p.valor === tarea.prioridad,
                              )?.color,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => toggleTarea(tarea.id)}
                        className="w-5 h-5 shrink-0 rounded-sm border flex items-center justify-center cursor-pointer transition-all"
                        style={{
                          borderColor: tarea.completada
                            ? "#22c55e"
                            : PRIORIDADES.find(
                                (p) => p.valor === tarea.prioridad,
                              )?.color,
                          background: tarea.completada
                            ? "rgba(34,197,94,0.15)"
                            : "transparent",
                          opacity: tarea.completada ? 0.6 : 1,
                        }}
                      >
                        {tarea.completada && (
                          <span
                            style={{ color: "#22c55e", fontSize: "0.6rem" }}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                      <div className="flex flex-col gap-1 ">
                        <p
                          className="max-w-25 text-sm wrap-break-words"
                          style={{
                            color: tarea.completada ? "#64748b" : "#e2e8f0",
                            textDecoration: tarea.completada
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {tarea.texto}
                        </p>
                        <p
                          className="uppercase text-xs tracking-wide font-bold"
                          style={{
                            color: tarea.completada
                              ? "#434d5a"
                              : PRIORIDADES.find(
                                  (p) => p.valor === tarea.prioridad,
                                )?.color,
                          }}
                        >
                          {tarea.prioridad}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarTarea(tarea.id)}
                      className="opacity-0 group-hover:opacity-100 text-lg transition-all cursor-pointer px-1 "
                      style={{
                        color: tarea.completada
                          ? "#434d5a"
                          : PRIORIDADES.find((p) => p.valor === tarea.prioridad)
                              ?.color,
                      }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              {mensajeVictoria && (
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-sm border 
    border-[#D4A017] whitespace-nowrap bg-[#060e18] drop-shadow-[0_0_20px_rgba(212,160,23,0.5)]"
                  style={{ animation: "fadeInDown 0.3s ease-out" }}
                >
                  <p className="text-sm font-bold tracking-widest text-[#D4A017]">
                    {mensajeVictoria}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {modalAbandonar && (
          <ModalAbandonar
            onClose={() => setModalAbandonar(false)}
            onConfirm={cancelarSesion}
          />
        )}
      </div>

      <button
        onClick={() => setModalAbandonar(true)}
        className="px-4 py-2 rounded-sm uppercase tracking-wide font-bold border border-[#2a5a8a] 
      text-[#a08c50] bg-[#060e18]/80 hover:bg-[#060e18] hover:text-[#D4A017] cursor-pointer transition-all"
      >
        Abandonar Sesión
      </button>
    </>
  );
}
