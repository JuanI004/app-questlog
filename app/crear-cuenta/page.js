"use client";

import Image from "next/image";
import signupImg from "@/public/signup.webp";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/components/Input";

export default function CrearCuenta() {
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [SignUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  function validarForm() {
    const newErrores = {};

    if (!SignUp.email.trim()) {
      newErrores.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(SignUp.email)) {
      newErrores.email = "El correo electrónico no es válido";
    }

    if (!SignUp.password.trim()) {
      newErrores.password = "La contraseña es obligatoria";
    } else if (SignUp.password.length < 6) {
      newErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!SignUp.confirmPassword.trim()) {
      newErrores.confirmPassword =
        "La confirmación de contraseña es obligatoria";
    } else if (SignUp.password !== SignUp.confirmPassword) {
      newErrores.confirmPassword = "Las contraseñas no coinciden";
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
    const { data, error } = await supabase.auth.signUp({
      email: SignUp.email,
      password: SignUp.password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/verificacion",
      },
    });

    if (!error && data.user && data.user.identities?.length === 0) {
      setErrores({ general: "Ya existe una cuenta con ese correo." });
      return;
    }
    setLoading(false);

    if (error) {
      setErrores({ general: error.message });
    } else {
      setMensaje("¡Cuenta creada! Revisá tu correo para confirmar tu cuenta.");
    }
  }
  return (
    <div
      className="flex m-5 justify-between bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] max-w-250 drop-shadow-[0_0_14px_rgba(95,153,245,0.7)]"
    >
      <div className="flex flex-col p-8 gap-4">
        <h2 className="title text-[2rem] text-[#F0C040]">
          Comienza tu aventura.
        </h2>
        <p className="text-slate-400 text-xl">
          Crea tu cuenta, acepta tus primeras misiones y empieza a subir de
          nivel en tu camino de estudio.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Correo electrónico"
            errores={errores.email}
            value={SignUp.email}
            type="text"
            handleChange={(value) => {
              setSignUp((prev) => ({ ...prev, email: value }));
              setErrores((prev) => ({ ...prev, email: "" }));
            }}
          />
          <Input
            label="Contraseña"
            type="password"
            handleChange={(value) => {
              setSignUp((prev) => ({ ...prev, password: value }));
              setErrores((prev) => ({ ...prev, password: "" }));
            }}
            errores={errores.password}
            value={SignUp.password}
          />
          <Input
            label="Repetir contraseña"
            type="password"
            handleChange={(value) => {
              setSignUp((prev) => ({ ...prev, confirmPassword: value }));
              setErrores((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            errores={errores.confirmPassword}
            value={SignUp.confirmPassword}
          />
          <button
            disabled={loading || mensaje}
            type="submit"
            className={`w-full mt-4 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer ${loading || (mensaje && "cursor-not-allowed opacity-70")}`}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

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
        src={signupImg}
        alt="Login image"
        className="hidden md:block w-2/5 h-auto rounded-r-sm object-cover "
      />
    </div>
  );
}
