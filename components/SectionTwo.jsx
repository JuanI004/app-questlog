import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ARQUETIPOS from "@/utils/arquetipos";
import Image from "next/image";

export default function SectionTwo({
  handlePreviousSection,
  handleNext,
  session,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const [errores, setErrores] = useState({});

  async function handleSubmit(e) {
    const { error } = await supabase
      .from("player")
      .update({
        arquetipo: ARQUETIPOS[selected].name,
        nuevo: false,
      })
      .eq("user_id", session.user.id);
    if (error) {
      setErrores({ general: error.message });
    }
    handleNext();
  }

  return (
    <div className="flex flex-col justify-between items-center w-full px-5">
      <p className="text-xs mx-5 pt-3 text-slate-400">
        Cada héroe aprende de forma distinta. Selecciona el arquetipo que
        definirá tu estilo de progreso y habilidades.
      </p>
      <div className="grid grid-cols-1 w-50 sm:w-lg items-center sm:grid-cols-3 gap-4 mx-5 py-4 h-full">
        {ARQUETIPOS.map((arq, i) => (
          <div
            onClick={() => {
              setSelected(i);
            }}
            key={arq.name}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`flex  flex-col cursor-pointer bg-[#060f1b] overflow-hidden rounded-sm border-2 ${
              selected === i
                ? "border-[#F0C040] drop-shadow-[0_0_12px_rgba(212,160,23,0.6)] scale-[1.02]"
                : "border-[#2a5a8a] hover:border-[#F0C040]/60 hover:scale-[1.01]"
            } transition-transform duration-200`}
          >
            <div className="relative">
              <Image src={arq.img} alt={arq.name} />
              <span className="absolute bottom-0 w-full h-0.75 bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]" />
              <div
                className={`absolute inset-0 bg-[#060e18]/90 flex flex-col justify-center 
    transition-all duration-300
    ${hoveredIndex === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <p
                  className={`title text-[0.7rem] tracking-widest px-2
                ${selected === i ? "text-[#F0C040]" : "text-[#a08c50] group-hover:text-[#F0C040]"}
                transition-colors duration-200`}
                >
                  {arq.name}
                </p>
                <p className="uppercase text-[0.65rem] p-2 text-[#2AABB5]">
                  {arq.estilo}
                </p>
                <p className="text-slate-400 text-[0.6rem] px-2">{arq.desc}</p>
                <ul className="p-2">
                  {arq.caracteristicas.map((carac) => (
                    <li
                      key={carac.title}
                      className="text-[0.55rem] p-1 text-slate-400"
                    >
                      <div className="flex items-center gap-1 text-[#D4A017]">
                        <div>
                          <div
                            key={carac.title}
                            className="flex gap-1 items-start"
                          >
                            <span className="w-1 h-1 bg-[#D4A017] rotate-45 shrink-0 mt-1" />
                            <p className="text-[8px] text-[#a08c50] leading-relaxed">
                              <span className="text-[#F0C040]">
                                {carac.title}:
                              </span>{" "}
                              {carac.info}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {errores.general && (
        <p className="text-red-500 text-xs mt-1">{errores.general}</p>
      )}
      <div className="flex gap-3 mx-5 pb-5 mt-1 w-full justify-end">
        <button
          type="button"
          onClick={handlePreviousSection}
          className="px-8 py-1 mt text-sm font-bold tracking-widest uppercase text-[#a08c50]
            border border-[#2a5a8a] rounded-sm hover:border-[#F0C040] hover:text-[#F0C040]
            transition-all duration-200 cursor-pointer"
        >
          ◀ Volver
        </button>
        <button
          onClick={handleSubmit}
          className="w-45 h-10 mt text-sm font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-1 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
        >
          Confirmar ▶
        </button>
      </div>
    </div>
  );
}
