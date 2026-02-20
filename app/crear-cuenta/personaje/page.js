"use client";
import SectionOne from "@/components/SectionOne";
import { useEffect, useState } from "react";
import SectionTwo from "@/components/SectionTwo";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function CrearPersonaje() {
  const [section, setSection] = useState(1);
  const [session, setSession] = useState(null);
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        setSession(null);
        router.push("/iniciar-sesion");
      } else {
        setSession(data.session);
      }
      supabase
        .from("player")
        .select("nuevo")
        .eq("user_id", data.session.user.id)
        .then(({ data, error }) => {
          if (error) {
            router.push("/iniciar-sesion");
          } else if (data[0]?.nuevo === false) {
            router.push("/");
          }
        });
    });
  }, [router]);
  function handlePreviousSection() {
    setSection(section - 1);
  }
  function handleNextSection() {
    setSection(section + 1);
  }
  function handleNext() {
    router.push("/");
  }
  return (
    <div
      className="flex flex-col max-h-110 max-w-xl bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] drop-shadow-[0_0_14px_rgba(95,153,245,0.7)] overflow-scroll"
    >
      <div className="flex mx-5 py-3 border-b border-[#2a5a8a] justify-center items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#D4A017] rotate-45" />
        <span className="w-2 h-2 bg-[#2AABB5] rotate-45" />
        <h1 className="title  tracking-widest text-[#F0C040]">
          Crea tu personaje
        </h1>
        <span className="w-2 h-2 bg-[#2AABB5] rotate-45" />
        <span className="w-1.5 h-1.5 bg-[#D4A017] rotate-45" />
      </div>
      {section === 1 && (
        <SectionOne handleNextSection={handleNextSection} session={session} />
      )}
      {section === 2 && (
        <SectionTwo
          handlePreviousSection={handlePreviousSection}
          handleNext={handleNext}
          session={session}
        />
      )}
    </div>
  );
}
