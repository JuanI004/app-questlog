"use client";
import InputDashboard from "@/components/InputDashboard";
import { supabase } from "@/lib/supabase";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SesionPage({ params }) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [sesion, setSesion] = useState(null);
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [segundos, setSegundos] = useState(null);
  const [ronda, setRonda] = useState(1);
  const [fase, setFase] = useState("batalla");
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const timerColor = fase === "descanso" ? "#2AABB5" : "#D4A017";
  const timerColorRgb = fase === "descanso" ? "42,171,181" : "212,160,23";

  useEffect(() => {
    supabase
      .from("sesiones")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          router.push("/dashboard");
          return;
        }
        setSesion(data);
        setSegundos(data.estudio_min * 60);
        setLoading(false);
      });
  }, [id, router]);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          if (fase === "batalla") {
            if (ronda >= sesion.cantidad_sesiones) {
              setIsRunning(false);
              return 0;
            }
            setFase("descanso");
            return sesion.descanso_min * 60;
          } else {
            setFase("batalla");
            setRonda((prevRonda) => prevRonda + 1);
            return sesion.estudio_min * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, segundos, fase, ronda]);

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
      <div
        className="flex mt-4 sm:flex-row justify-between w-7/8 gap-4 px-10 lg:w-5/8 py-6 rounded-sm
     border-[#2a5a8a]  items-center bg-[#060e18]/80 border"
      >
        <div className="relative flex-col items-center gap-4 ">
          <p className="text-slate-500 uppercase tracking-[4px]">
            Sesion activa
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
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className="mt-1 px-6 py-1.5 text-md font-bold uppercase tracking-[4px] rounded-sm border z-10 transition-all cursor-pointer"
              style={{
                borderColor: `rgba(${timerColorRgb},0.3)`,
                color: timerColor,
                background: `rgba(${timerColorRgb},0.05)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `rgba(${timerColorRgb},0.12)`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `rgba(${timerColorRgb},0.05)`)
              }
            >
              {isRunning ? "⏸ Pausar" : "▶ Continuar"}
            </button>
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
          </div>

          <span className="px-4 h-px w-7/8 bg-[#2a5a8a] mx-auto" />
          <div className="py-2 px-4 flex flex-col gap-4 ">
            <div className="flex gap-2 h-10 items-center justify-center">
              <InputDashboard
                label=""
                value={nuevaTarea}
                onChange={setNuevaTarea}
                placeholder="Nueva tarea..."
              />
              <button
                onClick={() => {
                  if (nuevaTarea.trim() === "" || fase === "descanso") return;
                  setTareas((prev) => [...prev, nuevaTarea.trim()]);
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
            <ul className="flex flex-col w-full gap-2 px-4 py-2">
              {tareas.map((tarea, index) => (
                <li key={index} className="text-slate-400">
                  {tarea}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
