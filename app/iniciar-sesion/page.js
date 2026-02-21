"use client";
import Image from "next/image";
import loginImg from "@/public/login.webp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/components/Input";
import Link from "next/link";
export default function IniciarSesion() {
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [LogIn, setLogIn] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || data.session) {
        router.push("/");
      }
    });
  }, [router]);
  function validarForm() {
    const newErrores = {};

    if (!LogIn.email.trim()) {
      newErrores.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(LogIn.email)) {
      newErrores.email = "El correo electrónico no es válido";
    }

    if (!LogIn.password.trim()) {
      newErrores.password = "La contraseña es obligatoria";
    } else if (LogIn.password.length < 6) {
      newErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrores({});
    setMensaje("");

    if (!validarForm()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: LogIn.email,
      password: LogIn.password,
    });
    setLoading(false);

    if (error) {
      setErrores({ general: error.message });
    } else {
      setMensaje("¡Sesión iniciada! Bienvenido de nuevo.");
      router.push("/");
    }
  }
  return (
    <div
      className="w-screen h-screen pt-20 flex items-center justify-center 
    bg-[url('@/public/background.webp')] bg-[#0B1C2C] bg-cover bg-center
      overflow-scroll"
    >
      <div
        className=" flex m-5 justify-between bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] max-w-250 drop-shadow-[0_0_14px_rgba(95,153,245,0.7)] "
      >
        <div className="flex flex-col  gap-4 p-8">
          <h2 className="title text-[2rem] text-[#F0C040]">
            Continúa tu aventura.
          </h2>
          <p className="text-slate-400 text-xl">
            Inicia sesión para retomar tus misiones y seguir subiendo de nivel.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo electrónico"
              errores={errores.email}
              value={LogIn.email}
              type="email"
              handleChange={(value) => {
                setLogIn((prev) => ({ ...prev, email: value }));
                setErrores((prev) => ({ ...prev, email: "" }));
              }}
            />
            <Input
              label="Contraseña"
              type="password"
              handleChange={(value) => {
                setLogIn((prev) => ({ ...prev, password: value }));
                setErrores((prev) => ({ ...prev, password: "" }));
              }}
              errores={errores.password}
              value={LogIn.password}
            />

            <button
              disabled={loading}
              type="submit"
              className={`w-full mt-4 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer ${loading && "cursor-not-allowed opacity-70"}`}
            >
              {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
          </form>
          <Link
            href="/crear-cuenta"
            className="text-xl text-slate-400 hover:text-[#F0C040] transition-colors"
          >
            ¿No tienes cuenta? Crea una aquí.
          </Link>
          {errores.general && (
            <p className="text-red-500 text-xl mt-1">{errores.general}</p>
          )}
          {mensaje && (
            <p
              className="text-xl text-emerald-400 border border-emerald-800 
              bg-emerald-950/40 rounded-sm px-3 py-2"
            >
              {mensaje}
            </p>
          )}
        </div>
        <Image
          src={loginImg}
          alt="Login image"
          className="hidden md:block w-2/5 h-auto rounded-r-sm object-cover "
        />
      </div>
    </div>
  );
}
