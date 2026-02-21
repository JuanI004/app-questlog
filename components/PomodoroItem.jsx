export default function PomodoroItem({
  label,
  value,
  onClickIncrement,
  onClickDecrement,
}) {
  return (
    <div
      className="flex flex-col justify-center items-center md:gap-2 py-2 px-2 border border-[#2a5a8a] bg-[#060e18]
                uppercase rounded-sm text-sm cursor-pointer text-[#64748b] "
    >
      {label}
      <div className="flex gap-3 py-1 items-center">
        <button
          onClick={onClickDecrement}
          type="button"
          className="px-3 py-1 rounded-sm border text-2xl cursor-pointer border-[#2a5a8a] bg-[#060e18] text-[#a08c50]"
        >
          -
        </button>
        <p className="text-2xl text-[#F0C040] font-bold ">{value}</p>
        <button
          onClick={onClickIncrement}
          type="button"
          className="px-3 py-1 rounded-sm border text-2xl cursor-pointer border-[#2a5a8a] bg-[#060e18] text-[#a08c50]"
        >
          +
        </button>
      </div>
    </div>
  );
}
