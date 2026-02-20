"use client";

import { supabase } from "@/lib/supabase";
import titleImg from "@/public/title.webp";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function NavBar() {
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    setSession(null);
  }
  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setSession(null);
        return;
      }
      setSession(data.session);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        },
      );
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    handleCallback();
  }, []);
  let ITEMS;
  if (session) {
    ITEMS = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Perfil", href: "/perfil" },
    ];
  } else {
    ITEMS = [
      { label: "Iniciar Sesión", href: "/iniciar-sesion" },
      { label: "Crear Cuenta", href: "/crear-cuenta" },
    ];
  }

  return (
    <>
      <nav
        className="w-screen h-12 fixed top-0 left-0  bg-linear-to-t from-[#060e18] via-[#0a1828] to-[#0d1e30] px-5 
    flex justify-center z-60"
      >
        <div className="w-full max-w-220 flex items-center justify-between">
          <Link href="/">
            <Image
              src={titleImg}
              alt="Questlog logo"
              className="h-15 w-25 drop-shadow-[0_0_8px_rgba(212,160,23,0.4)] 
          cursor-pointer transition-all duration-200 hover:scale-105 
          hover:drop-shadow-[0_0_14px_rgba(212,160,23,0.7)]"
            />
          </Link>

          <ul className="hidden sm:flex gap-5 text-[0.6rem] items-center">
            {ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <button
                    className="font-vend px-5 py-2 hover:bg-linear-to-b hover:from-[#1a3a60] hover:to-[#0f2340] 
              rounded-sm hover:border hover:border-[#2a5a8a]  font-semibold
              tracking-widest uppercase text-[#a08c50]
             hover:text-[#F0C040] transition-all delay-100  cursor-pointer
             hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.2)] hover:scale-105"
                  >
                    {item.label}
                  </button>
                </Link>
              </li>
            ))}
            {session && (
              <li>
                <button
                  onClick={handleSignOut}
                  className="font-vend px-5 py-2 hover:bg-linear-to-b hover:from-[#1a3a60] hover:to-[#0f2340] 
            rounded-sm hover:border hover:border-[#2a5a8a]  font-semibold
            tracking-widest uppercase text-[#a08c50]
           hover:text-[#F0C040] transition-all delay-100  cursor-pointer
           hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.2)] hover:scale-105"
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
          <button
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.25 
            rounded-sm cursor-pointer transition-all duration-200 relative z-70"
            style={{
              background: open ? "rgba(26,58,96,0.8)" : "transparent",
              border: open ? "1px solid #2a5a8a" : "1px solid transparent",
            }}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Menú"
          >
            <span
              className="block h-[1.5px] rounded-full transition-all duration-300 origin-center"
              style={{
                width: open ? "16px" : "20px",
                background: open ? "#F0C040" : "#a08c50",
                transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] rounded-full transition-all duration-300"
              style={{
                width: "14px",
                background: open ? "#F0C040" : "#a08c50",
                opacity: open ? 0 : 1,
                transform: open ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block h-[1.5px] rounded-full transition-all duration-300 origin-center"
              style={{
                width: open ? "16px" : "20px",
                background: open ? "#F0C040" : "#a08c50",
                transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>
      <div
        className={`fixed inset-0  md:hidden ${open ? "opacity-100  backdrop-blur-xs z-50" : "opacity-0"} 
          transition-all duration-300 bg-[rgba(6,14,24,0.7)] `}
        onClick={() => setOpen(false)}
      />
      {open && (
        <div
          className="flex flex-col justify-between opacity-100 sm:opacity-0  ease-in-out transition-opacity duration-300 fixed h-[calc(100vh-3rem)] right-0 top-12 w-72 z-60 
        bg-linear-to-t from-[#060e18] via-[#0a1828] to-[#0d1e30] border-x-2 border-[#17324d] "
        >
          <div>
            <span className="absolute w-full h-0.75 bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]" />
            <div className="flex justify-center items-center px-1 py-4 m-4 border-b border-[#2a5a8a]">
              <span className=" bg-[#D4A017] h-2 w-2 rotate-45 " />
              <p className="px-3 text-[0.5rem] uppercase tracking-[4px] text-[#a08c50]">
                Menú Principal
              </p>
              <span className=" bg-[#D4A017] h-2 w-2 rotate-45 " />
            </div>
            <ul className="px-1 py-2 mx-4 flex flex-col  gap-2">
              {ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <button
                      className="flex justify-between w-full text-left px-3 py-2 text-xs font-extrabold uppercase tracking-widest 
                rounded-md text-[#a08c50] hover:bg-[rgba(26,58,96,0.8)] hover:border
                hover:border-[#2a5a8a] hover:text-[#F0C040] cursor-pointer transition-all duration-200 hover:scale-105 group"
                    >
                      {item.label}{" "}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity group-hover:block text-[#F0C040]">
                        ▶
                      </span>
                    </button>
                  </Link>
                </li>
              ))}
              {session && (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex justify-between w-full text-left px-3 py-2 text-xs font-extrabold uppercase tracking-widest 
              rounded-md text-[#a08c50] hover:bg-[rgba(26,58,96,0.8)] hover:border
              hover:border-[#2a5a8a] hover:text-[#F0C040] cursor-pointer transition-all duration-200 hover:scale-105 group"
                  >
                    Cerrar Sesión
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity group-hover:block text-[#F0C040]">
                      ▶
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-center items-center px-1 py-4 m-4 border-t border-[#2a5a8a]">
            <p className="px-3 text-[0.5rem] uppercase tracking-[4px] text-[#265380]">
              QuestLog © 2025
            </p>
            <span className="absolute bottom-0 w-full h-0.75 bg-[linear-gradient(90deg,transparent,#D4A017,transparent)]" />
          </div>
        </div>
      )}
    </>
  );
}
