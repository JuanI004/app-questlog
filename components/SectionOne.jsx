import Image from "next/image";
import Input from "./Input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SectionOne({ handleNextSection, session }) {
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const [errores, setErrores] = useState({});
  const [image, setImage] = useState(null);

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
      <p className="text-xl mx-5 pt-3 text-slate-400">
        Forja tu identidad de aventurero. Sube tu imagen y elige el nombre con
        el que serás conocido en el reino del conocimiento.
      </p>
      <div className="flex flex-col mx-5 py-4 h-full justify-center items-center gap-2">
        <div
          onClick={() => document.getElementById("avatar").click()}
          className={`border-2 border-[#2a5a8a] w-65 h-65 rounded-full 
  flex flex-col justify-center items-center gap-2 overflow-hidden cursor-pointer
  hover:border-[#F0C040] hover:bg-[#1a3a60]/30 transition-all duration-200 
  ${errores.image && "border-red-500 bg-red-900/70"}`}
        >
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              width={260}
              height={260}
              className=" object-cover"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                fill="#044f7b"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
              </svg>
              <p className="text-center text-[#2a5a8a] text-xl">
                Seleccionar imagen
              </p>
            </>
          )}
        </div>
        {errores.image && (
          <p className="text-red-500 text-xl">{errores.image}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col w-100">
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
            <p className="text-red-500 text-xl mt-1">{errores.general}</p>
          )}
          <button
            type="submit"
            className="
                mt-4 text-xl font-bold tracking-widest uppercase text-[#0a1828]
                bg-linear-to-b from-[#F0C040] to-[#D4A017] border-b-4 border-[#8B6914]
                px-8 py-4 rounded-sm shadow-[0_0_30px_rgba(212,160,23,0.3)]
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
