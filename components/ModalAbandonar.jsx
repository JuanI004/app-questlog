export default function ModalAbandonar({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="flex flex-col gap-4 p-8 border border-[#2a5a8a] rounded-sm bg-[#060e18] max-w-sm w-full mx-4"
        style={{ boxShadow: "0 0 40px rgba(0,0,0,0.8)" }}
      >
        <div className="flex flex-col gap-1 text-center">
          <h2 className="title text-xl text-[#D4A017] uppercase tracking-widest">
            ¿Abandonar la batalla?
          </h2>
          <p className="text-sm text-slate-400">
            Si salís ahora perderás todo el progreso de esta sesión.
          </p>
          <p className="text-xs text-[#64748b] mt-1">
            No recibirás <span className="text-[#D4A017]">XP</span> ni{" "}
            <span className="text-[#D4A017]">monedas</span> por esta sesión.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 text-sm font-bold uppercase tracking-widest border rounded-sm cursor-pointer transition-all border-[#2a5a8a] text-[#64748b] hover:text-white hover:border-white"
          >
            Seguir peleando
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 text-sm font-bold uppercase tracking-widest border rounded-sm cursor-pointer transition-all border-red-900 text-red-700 hover:border-red-500 hover:text-red-400"
          >
            Abandonar
          </button>
        </div>
      </div>
    </div>
  );
}
