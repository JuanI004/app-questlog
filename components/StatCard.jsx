import Image from "next/image";

export default function StatCard({ label, value, icon }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-4 py-8
      bg-[#060e18]/95 border border-[#2a5a8a] rounded-sm
      hover:border-[#F0C040]/40 transition-all duration-300 group"
    >
      <Image src={icon} alt={label} width={60} height={60} />
      <p className="title text-4xl text-[#F0C040] drop-shadow-[0_0_8px_rgba(212,160,23,0.5)]">
        {value ?? "—"}
      </p>
      <p className="text-lg uppercase tracking-[3px] text-[#64748b] group-hover:text-[#a08c50] transition-colors">
        {label}
      </p>
    </div>
  );
}
