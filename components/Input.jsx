export default function Input({ label, errores, value, type, handleChange }) {
  return (
    <div>
      <label htmlFor={label} className="text-xl text-slate-300">
        {label}
      </label>
      <input
        className={`w-full text-xl p-3 bg-[#0f2340] border border-[#2a5a8a] rounded-sm
                 text-white focus:outline-0 ${errores && "border-red-500 bg-red-900/70"}`}
        type={type}
        id={label}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {errores && <p className="text-red-500 text-xl mt-1">{errores}</p>}
    </div>
  );
}
