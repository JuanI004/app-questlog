"use client";

import { useState, useEffect } from "react";

export default function IntroScreen({ materia, onDone }) {
  const [fase, setFase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setFase(1), 600),
      setTimeout(() => setFase(2), 1400),
      setTimeout(() => setFase(3), 2600),
      setTimeout(() => setFase(4), 3200),
      setTimeout(() => onDone(), 3800),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: fase === 3 ? "#1a0a00" : "#000000",
        opacity: fase === 4 ? 0 : 1,
        transition:
          fase === 4 ? "opacity 0.6s ease-out" : "background-color 0.2s",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
        }}
      />
      {fase >= 2 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,160,23,0.08) 0%, transparent 70%)",
            animation: "pulseGold 1.5s ease-in-out infinite",
          }}
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
        <p className="title text-[#a08c50] tracking-wide text-[0.75rem] uppercase transition-all duration-500 ease-out">
          ⚔ &nbsp; ENFRENTATE A &nbsp; ⚔
        </p>
        <h1
          className="title text-[#F0C040] text-center font-bold   uppercase tracking-wide"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            opacity: fase >= 2 ? 1 : 0,
            transform: fase >= 2 ? "scaleX(1)" : "scaleX(0.3)",
            transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
            textShadow:
              fase >= 2
                ? "0 0 30px rgba(212,160,23,0.7), 0 0 80px rgba(212,160,23,0.3), 3px 3px 0px #000, -3px -3px 0px #000"
                : "none",
          }}
        >
          {materia}
        </h1>
        {fase >= 2 && (
          <div
            className="flex items-center gap-4 w-full max-w-md"
            style={{ opacity: 1, transition: "opacity 0.4s 0.2s" }}
          >
            <div
              className="h-px flex-1"
              style={{
                background: "linear-gradient(to right, transparent, #D4A017)",
              }}
            />
            <span className="title text-[#D4A017] uppercase tracking-wide">
              FIGHT
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: "linear-gradient(to left, transparent, #D4A017)",
              }}
            />
          </div>
        )}
      </div>
      <style>{`@keyframes pulseGold { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
    </div>
  );
}
