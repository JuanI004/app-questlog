export default function ErrorModal({ message, onClose }) {
  return (
    <div
      className="fixed p-4 inset-0 border rounded-sm border-red-500 bg-red-900/70 flex 
    items-center justify-between z-50"
    >
      <p className="text-red-500 text-center p-4">{message}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#ff0000"
        viewBox="0 0 256 256"
      >
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
      </svg>
    </div>
  );
}
