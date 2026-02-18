"use client";

import titleImg from "@/public/title.png";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [session, setSession] = useState(null);

  return (
    <nav
      className="w-screen h-12 fixed top-0 left-0  bg-gradient-to-t from-[#060e18] via-[#0a1828] to-[#0d1e30] px-5 
    flex justify-center z-60"
    >
      <div className="w-full max-w-220 flex items-center justify-between">
        <Image
          src={titleImg}
          alt="Questlog logo"
          className="h-15 w-25 drop-shadow-[0_0_8px_rgba(212,160,23,0.4)] 
          cursor-pointer transition-all duration-200 hover:scale-105 
          hover:drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]"
        />
        <ul className="flex gap-5 text-[0.6rem] items-center">
          <li>
            <button
              className="font-vend  bg-transparent p-1.5 rounded-sm font-semibold 
              tracking-widest uppercase text-[#a08c50]
             hover:text-[#F0C040] transition-all hover:scale-105 delay-100 cursor-pointer"
            >
              Crear Cuenta
            </button>
          </li>
          <li>
            <button
              className="font-vend px-5 py-2 bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a]  font-semibold
              tracking-widest uppercase text-[#a08c50]
              hover:border hover:border-[#F0C040]
             hover:text-[#F0C040] transition-all delay-100  cursor-pointer
             hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.2)] hover:scale-105
              "
            >
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
