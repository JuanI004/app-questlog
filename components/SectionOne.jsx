import Image from "next/image";
import Input from "./Input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SectionOne({ handleNextSection }) {
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const [errores, setErrores] = useState({});

  const [image, setImage] = useState(null);
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
    });
  }, [router]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setErrores((prev) => ({ ...prev, image: null }));
    setData((prev) => ({ ...prev, image: file }));
    setImage(URL.createObjectURL(file));
  }

  async function uploadImageToStorage(file) {
    const extension = file.name.split(".").pop();
    const fileName = `${session.user.id}.${extension}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.log("Error uploading image:", error.message);
      throw error;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrores({});

    if (!validarForm()) return;
    try {
      let imageUrl = await uploadImageToStorage(data.image);
      const { error } = await supabase
        .from("player")
        .update({
          username: data.name,
          image_url: imageUrl,
          nuevo: false,
        })
        .eq("user_id", session.user.id);
      if (error) throw error;
      handleNextSection();
    } catch (err) {
      setErrores({ general: err.message });
    }
  }
  function validarForm() {
    const newErrores = {};

    if (!data.name.trim()) {
      newErrores.name = "El nombre es obligatorio";
    }
    if (!data.image) {
      newErrores.image = "La imagen es obligatoria";
    }

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  }
  return (
    <>
      <p className="text-xs mx-5 pt-3 text-white">
        Forja tu identidad de aventurero. Sube tu imagen y elige el nombre con
        el que serás conocido en el reino del conocimiento.
      </p>
      <div className="flex flex-col mx-5 py-4 h-full justify-center items-center gap-2">
        <div
          onClick={() => document.getElementById("avatar").click()}
          className={`border-2 border-[#2a5a8a] w-40 h-40 rounded-full 
  flex flex-col justify-center items-center gap-2 overflow-hidden cursor-pointer
  hover:border-[#F0C040] hover:bg-[#1a3a60]/30 transition-all duration-200 
  ${errores.image && "border-red-500 bg-red-900/70"}`}
        >
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              width={160}
              height={160}
              className=" object-cover"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 100 100"
                fill="none"
                stroke="#2a5a8a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="15" width="84" height="70" rx="6" />
                <circle cx="72" cy="35" r="8" />
                <polyline points="8,80 35,48 55,68 68,55 92,80" />
              </svg>
              <p className="text-center text-[#2a5a8a] text-xs">
                Seleccionar imagen
              </p>
            </>
          )}
        </div>
        {errores.image && (
          <p className="text-red-500 text-xs">{errores.image}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col w-60">
          <Input
            label="Nombre de Aventurero"
            errores={errores.name}
            type="text"
            value={data.name}
            handleChange={(value) => {
              setErrores((prev) => ({ ...prev, name: null }));
              setData({ ...data, name: value });
            }}
          />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {errores.general && (
            <p className="text-red-500 text-xs mt-1">{errores.general}</p>
          )}
          <button
            type="submit"
            className="
                mt-4 text-sm font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-3 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
                hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] hover:-translate-y-0.5
                active:translate-y-0.5 active:border-b-2
                transition-all duration-200 cursor-pointer"
          >
            Siguiente ▶
          </button>
        </form>
      </div>
    </>
  );
}
