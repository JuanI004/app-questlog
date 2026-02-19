"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/");
        return;
      }
      router.push("/crear-cuenta/personaje");
    };
    handleCallback();
  }, [router]);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#060e18]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#D4A017", borderTopColor: "transparent" }}
        />
        <p className="text-[#a08c50] text-xs tracking-widest uppercase">
          Verificando cuenta...
        </p>
      </div>
    </div>
  );
}
