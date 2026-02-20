import arqImg1 from "@/public/arquetipo1.webp";
import arqImg2 from "@/public/arquetipo2.webp";
import arqImg3 from "@/public/arquetipo3.webp";

const ARQUETIPOS = [
  {
    img: arqImg1,
    name: "Caballero del Saber",
    estilo: "Disciplina y constancia",
    para: "organizados, que prefieren estructura y rutina",
    desc: "El Caballero progresa con constancia. Ideal para quienes prefieren orden y rutina.",
    caracteristicas: [
      {
        title: "Bonus de Disciplina",
        info: "+XP extra por completar tareas diarias consecutivas (streaks).",
      },
      {
        title: "Fortaleza Mental",
        info: "penalización reducida al fallar una misión.",
      },
    ],
  },
  {
    img: arqImg2,
    name: "Mago del Conocimiento",
    estilo: "Enfoque profundo y estudio intenso",
    para: "que estudian en sesiones largas y concentradas",
    desc: "El Mago domina el conocimiento profundo y desbloquea habilidades avanzadas.",
    caracteristicas: [
      {
        title: "Bonus de Concentración",
        info: "XP extra por sesiones largas sin distracciones (modo foco).",
      },
      {
        title: "Sabiduría Arcana",
        info: "desbloquea habilidades antes que otros arquetipos.",
      },
    ],
  },
  {
    img: arqImg3,
    name: "Elfo Explorador",
    estilo: "Velocidad, curiosidad y variedad",
    para: "que estudian muchas cosas distintas o en sesiones cortas",
    desc: "El Elfo avanza explorando y aprendiendo de todo un poco, rápido y con agilidad.",
    caracteristicas: [
      {
        title: "Bonus de Velocidad",
        info: "XP extra por completar muchas tareas pequeñas.",
      },
      {
        title: "Curiosidad Élfica",
        info: "recompensas por explorar nuevas materias.",
      },
    ],
  },
];
export default ARQUETIPOS;
