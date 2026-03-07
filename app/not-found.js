"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import notFoundImg from "@/public/404.webp";

export default function NotFound() {
  const [particulas, setParticulas] = useState([]);
  useEffect(() => {
    setTimeout(
      () =>
        setParticulas(
          Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
            size: 2 + Math.random() * 4,
          })),
        ),
      0,
    );
  }, []);
  return (
    <div className=" pt-12 relative w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060e18]">
      {particulas.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.id % 2 === 0 ? "#a855f7" : "#D4A017",
            boxShadow: `0 0 ${p.size * 2}px ${p.id % 2 === 0 ? "#a855f7" : "#D4A017"}`,
            animation: `subirParticula ${p.duration}s ease-in ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <div className="flex flex-col items-center gap-4 z-10">
        <Image
          src={notFoundImg}
          alt="404 Not Found"
          width={600}
          height={600}
          className="drop-shadow-[0_0_60px_rgba(120,60,220,0.4)]"
        />
        <div className="flex items-center gap-3 mt-1">
          <span className="h-0.5 w-15 bg-linear-to-r from-transparent to-[#a855f7]/60" />
          <span className="w-3 h-3 bg-[#a855f7] rotate-45" />
          <p className="text-[#a855f7] text-center text-xl uppercase tracking-[7px]">
            Portal destruido
          </p>
          <span className="w-3 h-3 bg-[#a855f7] rotate-45" />
          <span className="h-0.5 w-15 bg-linear-to-l from-transparent to-[#a855f7]/60" />
        </div>
        <p className="text-slate-400 text-lg max-w-md text-center">
          El camino que buscabas fue consumido por la oscuridad. Esta página no
          existe en el reino.
        </p>
        <div className="flex items-center gap-5 mt-1">
          <span className="h-0.5 w-45 bg-linear-to-r from-transparent to-[#D4A017]/60" />
          <span className="w-2 h-2 bg-[#D4A017] rotate-45" />

          <span className="h-0.5 w-45 bg-linear-to-l from-transparent to-[#D4A017]/60" />
        </div>
        <Link
          href="/"
          className="
                mt-4 text-lg font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-10 py-5 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
