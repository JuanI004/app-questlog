"use client";

import { useMemo } from "react";

function ParticulasMagicas({ color = "#2AABB5", cantidad = 5, radio = 36 }) {
  const particulas = useMemo(
    () =>
      Array.from({ length: cantidad }).map((_, i) => ({
        angulo: (360 / cantidad) * i,
        delay: (i / cantidad) * 3,
      })),
    [cantidad],
  );

  return (
    <>
      {particulas.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            width: "4px",
            height: "4px",
            marginTop: "-2px",
            marginLeft: "-2px",
            "--radio": `${radio}px`,
            zIndex: 2,
            animation: `orbitar 3s linear ${p.delay}s infinite`,
            transformOrigin: "0 0",
            transform: `rotate(${p.angulo}deg) translateX(${radio}px)`,
          }}
        >
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 6px ${color}`,
              animation: `parpadeo 1.5s ease-in-out ${p.delay}s infinite`,
            }}
          />
        </div>
      ))}
    </>
  );
}

export default function MarcoPreview({ item, children, size, sizePx }) {
  const animacion = item.datos?.animacion;
  const borderColor = item.datos?.border_color;
  const borderWidth = item.datos?.border_width ?? 2;
  const glow = item.datos?.glow ?? "transparent";
  const gradient = item.datos?.gradient;
  const radioParticulas = sizePx ? Math.round(sizePx / 2) + 6 : 36;

  return (
    <div className="flex items-center justify-center h-20">
      <div className={`relative w-${size} h-${size}`}>
        {children}
        {!animacion && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              zIndex: 1,
              border: `${borderWidth}px solid ${borderColor}`,
              boxShadow: glow !== "transparent" ? `0 0 14px ${glow}` : "none",
            }}
          />
        )}
        {animacion === "pulso" && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              zIndex: 1,
              border: `${borderWidth}px solid ${borderColor}`,
              "--glow-color": glow,
              animation: "pulso 2s ease-in-out infinite",
            }}
          />
        )}
        {animacion === "giro" && (
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              zIndex: 1,
              inset: `-${borderWidth}px`,
              background:
                gradient ??
                `linear-gradient(45deg, ${borderColor}, ${borderColor}88, ${borderColor})`,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: `${borderWidth}px`,
              animation: "giro 3s linear infinite",
              boxShadow: `0 0 16px ${glow}`,
            }}
          />
        )}
        {animacion === "fuego" && (
          <>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                zIndex: 1,
                border: `${borderWidth}px solid ${borderColor}`,
                "--glow-color": glow,
                animation: "pulso 1.2s ease-in-out infinite",
              }}
            />
            <ParticulasMagicas
              color={borderColor}
              cantidad={10}
              radio={radioParticulas}
            />
          </>
        )}
        {animacion === "particulas" && (
          <>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                zIndex: 1,
                border: `${borderWidth}px solid ${borderColor}`,
                boxShadow: `0 0 12px ${glow}`,
              }}
            />
            <ParticulasMagicas
              color={borderColor}
              cantidad={7}
              radio={radioParticulas}
            />
          </>
        )}
        {animacion === "campeon" && (
          <>
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                zIndex: 1,
                inset: `-${borderWidth}px`,
                background:
                  gradient ??
                  `conic-gradient(${borderColor}, #F0C040, ${borderColor})`,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: `${borderWidth}px`,
                animation: "giro 2s linear infinite",
                boxShadow: `0 0 20px ${glow}`,
              }}
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
              style={{ zIndex: 2 }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "campeon-sweep 2s linear infinite",
                }}
              />
            </div>
          </>
        )}
        {animacion === "abismo" && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              zIndex: 1,
              border: `${borderWidth}px solid ${borderColor}`,
              animation: "abismo 2.5s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}
