"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import monedasIcon from "@/public/monedas-icon.svg";
import xpIcon from "@/public/xp-icon.svg";

export default function Trivia({
  categoriaId,
  dificultad,
  categoriaNombre,
  colorDificultad,
  handleFinalizarTrivia,
  usosRestantes,
  tieneExplorador,
}) {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState();
  const [preguntasCorrectas, setPreguntasCorrectas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let xp =
    preguntasCorrectas.length *
    { easy: 1, medium: tieneExplorador ? 10 : 5, hard: 10 }[dificultad];
  let monedas =
    preguntasCorrectas.length * { easy: 1, medium: 2, hard: 3 }[dificultad];
  const cat = categoriaId !== 0 ? `&category=${categoriaId}` : "";
  const url = `https://opentdb.com/api.php?amount=10${cat}&difficulty=${dificultad}&type=multiple`;
  const progreso = ((preguntaActual + 1) / 10) * 100;
  useEffect(() => {
    async function fetchPreguntas() {
      const response = await fetch(url);
      const data = await response.json();
      if (response.status === 429) {
        setError(
          "Demasiadas requests. Esperá unos segundos e intentá de nuevo.",
        );
        setLoading(false);
        return;
      }
      if (!data.results?.length) {
        setError("No se pudieron cargar las preguntas.");
        setLoading(false);
        return;
      }
      setPreguntas(data.results);
      setLoading(false);
    }
    fetchPreguntas();
  }, [url]);
  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);
  function handleClickRespuesta(index, resp) {
    if (respuestaSeleccionada) return;
    setRespuestaSeleccionada({ indice: index, estado: "Esperando" });
    setTimeout(() => {
      const esCorrecta = resp === preguntas[preguntaActual].correct_answer;
      const nuevasCorrectas = esCorrecta
        ? [...preguntasCorrectas, preguntaActual]
        : preguntasCorrectas;
      if (esCorrecta) {
        setPreguntasCorrectas(nuevasCorrectas);
        setRespuestaSeleccionada({ indice: index, estado: "Correcta" });
      } else {
        setRespuestaSeleccionada({ indice: index, estado: "Incorrecta" });
      }
      setTimeout(() => {
        if (preguntaActual === preguntas.length - 1) {
          const xpFinal =
            nuevasCorrectas.length *
            { easy: 1, medium: tieneExplorador ? 10 : 5, hard: 10 }[dificultad];
          const monedasFinal =
            nuevasCorrectas.length *
            { easy: 1, medium: 2, hard: 3 }[dificultad];
          handleFinalizarTrivia(xpFinal, monedasFinal, nuevasCorrectas.length);
          return;
        }
        setRespuestaSeleccionada();
        setPreguntaActual((prev) => prev + 1);
      }, 1000);
    }, 1000);
  }
  function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }
  function esCorrecta(index) {
    return preguntasCorrectas.includes(index);
  }
  const respuestasOrdenadas = useMemo(() => {
    if (error || loading) return [];
    return [
      ...preguntas[preguntaActual].incorrect_answers,
      preguntas[preguntaActual].correct_answer,
    ].sort(() => Math.random() - 0.5);
  }, [error, loading, preguntaActual, preguntas]);

  if (loading || error) {
    return (
      <div className="w-full h-100 flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: "#D4A017", borderTopColor: "transparent" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative gap-5 flex flex-col  px-10 py-8 ">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center ">
        <div className="flex gap-4 ">
          {" "}
          <p className="text-slate-400  tracking-widest">
            {preguntaActual + 1} / 10
          </p>
          <div className="flex gap-2  items-center ">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 border border-[#2a5a8a] rotate-45 ${
                  i + 1 < preguntaActual + 1 && esCorrecta(i)
                    ? "bg-[#22c55e] drop-shadow-[0_0_5px_rgba(34,197,94,0.75)]"
                    : i + 1 < preguntaActual + 1 && !esCorrecta(i)
                      ? "bg-[#ef4444] drop-shadow-[0_0_10px_rgba(255,0,0,0.75)]"
                      : i + 1 === preguntaActual + 1
                        ? "bg-[#D4A017] drop-shadow-[0_0_5px_rgba(212,160,23,0.9)]"
                        : "bg-[#0c1a29]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className=" text-md font-medium items-center flex justify-center gap-4">
          {usosRestantes > 0 && (
            <>
              <p className="flex gap-2 text-[#2AABB5] font-bold">
                <Image src={xpIcon} alt="XP" width={20} height={20} /> +
                {xp}{" "}
              </p>

              <div className="flex gap-2 text-[#D4A017] font-bold">
                <Image src={monedasIcon} alt="Monedas" width={20} height={20} />{" "}
                +{monedas}
              </div>
            </>
          )}

          <p
            onClick={() => window.location.reload()}
            className="uppercase text-slate-400 tracking-widest cursor-pointer hover:text-slate-700"
          >
            Salir
          </p>
        </div>
      </div>
      <div className="w-full  h-2 bg-[#060e18] rounded-full   overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${progreso}%`,
            background: `linear-gradient(90deg, #F0C04060, #F0C040)`,
          }}
        />
      </div>
      <div className="relative flex flex-col p-4 border rounded-sm border-[#2a5a8a] bg-linear-to-br from-[#0d1e30] via-[#0a1828] to-[#060e18]">
        <span className="absolute w-full top-0 h-px bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]" />
        <div className="flex flex-col justify-between items-center md:items-start md:flex-row gap-3 mb-4">
          <div className="flex gap-3  items-center">
            <p
              className="uppercase font-bold p-1 px-2 border rounded-sm text-sm tracking-widest"
              style={{
                color: colorDificultad,
                borderColor: colorDificultad,
                background: `${colorDificultad}33`,
              }}
            >
              {dificultad === "easy"
                ? "Fácil"
                : dificultad === "medium"
                  ? "Media"
                  : "Difícil"}
            </p>
            <p className="uppercase text-slate-500 text-sm tracking-widest">
              {categoriaNombre}
            </p>
          </div>
          <p className="uppercase text-slate-500 p-1 px-2 border border-[#2a5a8a73] rounded-sm text-sm tracking-widest">
            {decodeHTML(
              preguntas[preguntaActual].type === "multiple"
                ? "Opción Múltiple"
                : "Verdadero / Falso",
            )}
          </p>
        </div>
        <div className="h-50 flex items-center justify-center p-10">
          <p className="text-center text-2xl font-bold text-white">
            {decodeHTML(preguntas[preguntaActual].question)}
          </p>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-3">
        {respuestasOrdenadas.map((respuesta, index) => (
          <div
            key={index}
            onClick={() => handleClickRespuesta(index, respuesta)}
            className=" flex items-center justify-between p-2 rounded-sm border hover:bg-[#2a5a8a50] border-[#2a5a8a7c]
               hover:border-[#2a5a8a] text-slate-500 hover:text-slate-400 group cursor-pointer transition-all duration-200 font-bold"
            style={{
              color:
                respuestaSeleccionada &&
                respuestaSeleccionada.indice === index &&
                respuestaSeleccionada.estado === "Esperando"
                  ? "#000"
                  : respuestaSeleccionada &&
                      ((respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Correcta") ||
                        (respuestaSeleccionada.estado === "Incorrecta" &&
                          respuesta ===
                            preguntas[preguntaActual].correct_answer))
                    ? "#22c55e"
                    : respuestaSeleccionada &&
                        respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Incorrecta"
                      ? "#ef4444"
                      : "#64748b",
              borderColor:
                respuestaSeleccionada &&
                respuestaSeleccionada.indice === index &&
                respuestaSeleccionada.estado === "Esperando"
                  ? "#D4A017"
                  : respuestaSeleccionada &&
                      ((respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Correcta") ||
                        (respuestaSeleccionada.estado === "Incorrecta" &&
                          respuesta ===
                            preguntas[preguntaActual].correct_answer))
                    ? "#22c55e"
                    : respuestaSeleccionada &&
                        respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Incorrecta"
                      ? "#ef4444"
                      : "#2a5a8a7c",
              backgroundColor:
                respuestaSeleccionada &&
                respuestaSeleccionada.indice === index &&
                respuestaSeleccionada.estado === "Esperando"
                  ? "#D4A017"
                  : respuestaSeleccionada &&
                      ((respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Correcta") ||
                        (respuestaSeleccionada.estado === "Incorrecta" &&
                          respuesta ===
                            preguntas[preguntaActual].correct_answer))
                    ? "#22c55e33"
                    : respuestaSeleccionada &&
                        respuestaSeleccionada.indice === index &&
                        respuestaSeleccionada.estado === "Incorrecta"
                      ? "#ef444442"
                      : "transparent",
            }}
          >
            <div className="flex items-center gap-3">
              <p
                className="p-1 w-8 text-center rounded-sm border border-[#2a5a8a7c] group-hover:border-[#2a5a8a] "
                style={{
                  borderColor:
                    respuestaSeleccionada &&
                    respuestaSeleccionada.indice === index &&
                    respuestaSeleccionada.estado === "Esperando"
                      ? "#000"
                      : respuestaSeleccionada &&
                          ((respuestaSeleccionada.indice === index &&
                            respuestaSeleccionada.estado === "Correcta") ||
                            (respuestaSeleccionada.estado === "Incorrecta" &&
                              respuesta ===
                                preguntas[preguntaActual].correct_answer))
                        ? "#22c55e"
                        : respuestaSeleccionada &&
                            respuestaSeleccionada.indice === index &&
                            respuestaSeleccionada.estado === "Incorrecta"
                          ? "#ef4444"
                          : "#2a5a8a7c",
                }}
              >
                {index === 0
                  ? "A"
                  : index === 1
                    ? "B"
                    : index === 2
                      ? "C"
                      : "D"}
              </p>
              <p className="">{decodeHTML(respuesta)}</p>
            </div>
            {respuestaSeleccionada &&
              ((respuestaSeleccionada.indice === index &&
                respuestaSeleccionada.estado === "Correcta") ||
                (respuestaSeleccionada.estado === "Incorrecta" &&
                  respuesta === preguntas[preguntaActual].correct_answer)) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#22c55e"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              )}
            {respuestaSeleccionada &&
              respuestaSeleccionada.indice === index &&
              respuestaSeleccionada.estado === "Incorrecta" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#ef4444"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
