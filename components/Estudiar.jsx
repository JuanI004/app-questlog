import { useState } from "react";
import InputDashboard from "./InputDashboard";
import PomodoroItem from "./PomodoroItem";

const MATERIAS = [
  "Matemáticas",
  "Lengua",
  "Historia",
  "Ciencias",
  "Programación",
  "Inglés",
  "Física",
  "Química",
  "Filosofía",
  "Otra",
];
const PRESETS = [
  { label: "Clásico", estudio: 25, descanso: 5, sesiones: 4 },
  { label: "Largo", estudio: 50, descanso: 10, sesiones: 3 },
  { label: "Corto", estudio: 15, descanso: 3, sesiones: 6 },
];

export default function Estudiar() {
  const [data, setData] = useState(null);
  const [errores, setErrores] = useState({});
  const [pomodoroTime, setPomodoroTime] = useState({
    estudio: 25,
    descanso: 5,
    sesiones: 4,
  });
  const incrementPomodoro = (key, max) => {
    setPomodoroTime((prev) => ({ ...prev, label: "" }));
    setPomodoroTime((prev) => {
      if (prev[key] + 1 > max) {
        return prev;
      }
      return {
        ...prev,
        [key]: prev[key] + 1,
      };
    });
  };
  const decrementPomodoro = (key, min) => {
    setPomodoroTime((prev) => {
      if (prev[key] - 1 < min) {
        return prev;
      }
      return {
        ...prev,
        [key]: prev[key] - 1,
      };
    });
  };
  const tiempoTotalEstimado =
    pomodoroTime.estudio * pomodoroTime.sesiones +
    pomodoroTime.descanso * (pomodoroTime.sesiones - 1);
  const [pomodoroAbierto, setPomodoroAbierto] = useState(false);
  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center ">
      <div className="flex flex-col w-full gap-3">
        <p className="uppercase tracking-[4px] pl-1 text-[#a08c50] text-xl text-left">
          Materia
        </p>
        <div className="grid grid-cols-2 grid-rows-5 sm:grid-cols-5 sm:grid-rows-2 ">
          {MATERIAS.map((materia, index) => (
            <div key={index} className="p-1 text-sm">
              <button
                onClick={() => setData((prev) => ({ ...prev, materia }))}
                className={`flex justify-center items-center w-full py-2 px-4 border border-[#2a5a8a] bg-[#060e18]
                uppercase  rounded-sm  md:text-lg  cursor-pointer ${
                  data?.materia === materia
                    ? "bg-linear-to-b from-[#1a3a60] to-[#0f2340] text-[#F0C040]  border-[#F0C040]"
                    : "text-[#64748b] hover:text-[#a08c50] hover:bg-[#0f2340]/50"
                }`}
              >
                {materia}
              </button>
            </div>
          ))}
        </div>
      </div>
      <form className="flex flex-col w-full gap-5">
        {data?.materia === "Otra" && (
          <InputDashboard
            label="¿Que materia?"
            value={data?.materiaPersonalizada}
            type="text"
            placeholder="Escribe la materia que quieras estudiar"
            onChange={(value) =>
              setData((prev) => ({ ...prev, materiaPersonalizada: value }))
            }
          />
        )}
        <InputDashboard
          value={data?.descripcion}
          label="Descripción"
          opcional={true}
          type="text"
          placeholder="Ej: Ejercicios de integrales, repasar historia medieval, etc."
          onChange={(value) =>
            setData((prev) => ({ ...prev, descripcion: value }))
          }
        />

        <button
          type="button"
          className="cursor-pointer group"
          onClick={() => setPomodoroAbierto((prev) => !prev)}
        >
          <div className="flex justify-between items-center">
            <p
              className="uppercase tracking-[4px] pl-1 group-hover:text-[#F0C040] text-[#a08c50] 
            text-xl transition-colors text-left"
            >
              Temporizador pomodoro
            </p>
            <div className="flex gap-3">
              <p className="text-[#64748b] capitalize tracking-normal">
                {`${pomodoroTime.estudio}m / ${pomodoroTime.descanso}m · ${pomodoroTime.sesiones} sesiones `}
              </p>
              <span
                className="text-[#a08c50] transition-transform duration-300 cursor-pointer"
                style={{
                  transform: pomodoroAbierto
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </div>
          </div>
        </button>
        {pomodoroAbierto && (
          <div className="flex flex-col gap-4 p-4 border border-[#2a5a8a] rounded-sm bg-[#060e18]">
            <p
              className="uppercase tracking-[4px] pl-1  text-slate-500
            text-lg  text-left"
            >
              Presets
            </p>
            <div className="w-2/3 flex gap-2">
              {PRESETS.map((preset, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setPomodoroTime(preset)}
                  className={`flex flex-col md:flex-row justify-center items-center md:gap-2 py-2 px-2 border border-[#2a5a8a] bg-[#060e18]
                uppercase rounded-sm text-sm cursor-pointer ${
                  pomodoroTime.label === preset.label
                    ? "bg-linear-to-b from-[#1a3a60] to-[#0f2340] text-[#F0C040] border-[#F0C040]"
                    : "text-[#64748b] hover:text-[#a08c50] hover:bg-[#0f2340]/50"
                }`}
                >
                  {preset.label}{" "}
                  <p className="text-[#64748b] capitalize tracking-normal">
                    {`${preset.estudio}m/${preset.descanso}m`}
                  </p>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3  pb-4 border-b border-[#2a5a8a] gap-2">
              <PomodoroItem
                label="Estudio"
                value={pomodoroTime.estudio}
                unidad="m"
                onClickIncrement={() => incrementPomodoro("estudio", 90)}
                onClickDecrement={() => decrementPomodoro("estudio", 5)}
              />
              <PomodoroItem
                label="Descanso"
                value={pomodoroTime.descanso}
                min={1}
                max={30}
                unidad="m"
                onClickIncrement={() =>
                  incrementPomodoro("descanso", pomodoroTime.estudio)
                }
                onClickDecrement={() => decrementPomodoro("descanso", 1)}
              />
              <PomodoroItem
                label="Sesiones"
                value={pomodoroTime.sesiones}
                unidad=""
                onClickIncrement={() => incrementPomodoro("sesiones", 10)}
                onClickDecrement={() => decrementPomodoro("sesiones", 1)}
              />
            </div>
            <div className="flex justify-between">
              <p
                className="uppercase tracking-[4px] pl-1  text-slate-500
            text-sm  text-left"
              >
                Tiempo total estimado
              </p>
              <p className="text-sm text-[#F0C040] font-bold tabular-nums">
                ~
                {tiempoTotalEstimado >= 60
                  ? `${Math.floor(tiempoTotalEstimado / 60)} h ${tiempoTotalEstimado % 60} m`
                  : `${tiempoTotalEstimado} minutos`}
              </p>
            </div>
          </div>
        )}
        {errores.pomodoro && (
          <p className="text-red-500 text-md">{errores.pomodoro}</p>
        )}
        <button
          className="
                mt-6 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-10 py-5 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
        >
          Comenzar
        </button>
      </form>
    </div>
  );
}
