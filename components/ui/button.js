export function Button({ children, className, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}
