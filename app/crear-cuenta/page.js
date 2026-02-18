"use client";

import Image from "next/image";
import signupImg from "@/public/signup.png";
import { useState } from "react";

export default function CrearCuenta() {
  const [errores, setErrores] = useState({});
  const [SignUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  function validarForm() {
    if (!SignUp.email.trim()) {
      setErrores((prev) => ({
        ...prev,
        email: "El correo electrónico es obligatorio",
      }));
      return false;
    }
    if (!SignUp.password.trim()) {
      setErrores((prev) => ({
        ...prev,
        password: "La contraseña es obligatoria",
      }));
      return false;
    }
    if (!SignUp.confirmPassword.trim()) {
      setErrores((prev) => ({
        ...prev,
        confirmPassword: "La confirmación de contraseña es obligatoria",
      }));
      return false;
    }
    if (SignUp.password !== SignUp.confirmPassword) {
      setErrores((prev) => ({
        ...prev,
        confirmPassword: "Las contraseñas no coinciden",
      }));
      return false;
    }
    if (SignUp.password.length < 6) {
      setErrores((prev) => ({
        ...prev,
        password: "La contraseña debe tener al menos 6 caracteres",
      }));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(SignUp.email)) {
      setErrores((prev) => ({
        ...prev,
        email: "El correo electrónico no es válido",
      }));
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validarForm()) {
    }
  }
  return (
    <div
      className="w-screen h-screen pt-12 flex items-center justify-center 
    bg-[url('@/public/background.png')] bg-[#0B1C2C] bg-cover bg-center
     "
    >
      <div
        className="flex  bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] max-w-lg "
      >
        <div className="flex flex-col p-5 gap-3">
          <h2 className="title text-2xl text-[#F0C040]">
            Comienza tu aventura.
          </h2>
          <p className="text-slate-400 text-xs">
            Crea tu cuenta, acepta tus primeras misiones y empieza a subir de
            nivel en tu camino de estudio.
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-xs text-slate-300">
                Correo electrónico
              </label>
              <input
                className="w-full text-xs p-2 bg-[#0f2340] border border-[#2a5a8a] rounded-sm text-white focus:outline-0"
                type="email"
                required
                id="email"
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="text-xs text-slate-300">
                Contraseña
              </label>
              <input
                className="w-full text-xs p-2 bg-[#0f2340] border border-[#2a5a8a] rounded-sm text-white focus:outline-0"
                type="password"
                required
                id="password"
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="text-xs text-slate-300">
                Repetir contraseña
              </label>
              <input
                className="w-full text-xs p-2 bg-[#0f2340] border border-[#2a5a8a] rounded-sm text-white focus:outline-0"
                type="password"
                required
                id="confirmPassword"
                onChange={(e) =>
                  setSignUp((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-sm font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-3 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
            >
              Registrarse
            </button>
          </form>
        </div>
        <Image
          src={signupImg}
          alt="Login image"
          className="hidden sm:block w-3/4 h-auto rounded-r-sm object-cover"
        />
      </div>
    </div>
  );
}
