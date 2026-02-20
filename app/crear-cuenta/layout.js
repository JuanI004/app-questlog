export default function CrearCuentaLayout({ children }) {
  return (
    <div
      className="w-screen pt-12 h-screen flex items-center justify-center 
    bg-[url('@/public/background.webp')] bg-[#0B1C2C] bg-cover bg-center
     overflow-scroll"
    >
      {children}
    </div>
  );
}
