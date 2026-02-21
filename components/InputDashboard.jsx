export default function InputDashboard({
  label,
  value,
  onChange,
  placeholder,
  type,
  opcional,
}) {
  return (
    <div className="flex flex-col w-full gap-3">
      <label
        htmlFor="materia"
        className="uppercase tracking-[4px] text-xl pl-1 text-[#a08c50] text-left"
      >
        {label}{" "}
        {opcional && (
          <span className="text-[#64748b] capitalize tracking-normal">
            (Opcional)
          </span>
        )}
      </label>
      <input
        id="materia"
        type={type}
        className="border rounded-sm p-3 outline-0 text-slate-300 border-[#2a5a8a] bg-[#060e18]"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
