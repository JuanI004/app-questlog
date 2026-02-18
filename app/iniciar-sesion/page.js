import Image from "next/image";
import loginImg from "@/public/login.png";

export default function IniciarSesion() {
  return (
    <div
      className="w-screen h-screen pt-12 flex items-center justify-center 
    bg-[url('@/public/background.png')] bg-[#0B1C2C] bg-cover bg-center
     "
    >
      <div
        className=" flex  bg-linear-to-b from-[#1a3a60] to-[#0f2340] 
              rounded-sm border border-[#2a5a8a] max-w-lg "
      >
        <div className="flex flex-col gap-3 p-5">
          <h2 className="title text-2xl text-[#F0C040]">
            Continúa tu aventura.
          </h2>
          <p className="text-slate-400 text-xs">
            Inicia sesión para retomar tus misiones y seguir subiendo de nivel.
          </p>
          <form>
            <div>
              <label htmlFor="email" className="text-xs text-slate-300">
                Correo electrónico
              </label>
              <input
                className="w-full text-xs p-2 bg-[#0f2340] border border-[#2a5a8a] rounded-sm text-white focus:outline-0"
                type="email"
                id="email"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="text-xs text-slate-300">
                Contraseña
              </label>
              <input
                className="w-full text-xs p-2 bg-[#0f2340] border border-[#2a5a8a] rounded-sm text-white focus:outline-0"
                type="password"
                id="password"
              />
            </div>
            <button
              className="w-full mt-4 text-sm font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-3 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <Image
          src={loginImg}
          alt="Login image"
          className="hidden sm:block w-2/4 h-auto rounded-r-sm object-cover"
        />
      </div>
    </div>
  );
}
