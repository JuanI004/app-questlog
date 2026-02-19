export default function CrearCuentaLayout({ children }) {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
    bg-[url('@/public/background.png')] bg-[#0B1C2C] bg-cover bg-center
     overflow-scroll"
    >
      {children}
    </div>
  );
}
