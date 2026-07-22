function Button({ children, onClick, variant = "primary", className = "" }) {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        style={{ fontFamily: "Open Sans" }}
        className={`group relative overflow-hidden flex items-center justify-center gap-3 rounded-4xl bg-gradient-to-r from-purple-500 to-[rgb(103,30,206)] px-8 py-4 text-base font-semibold tracking-[0.5px] text-white shadow-[0_12px_35px_rgba(98,0,255,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(98,0,255,0.38)] active:scale-[0.98] cursor-pointer ${className}`}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        style={{ fontFamily: "Open Sans" }}
        className="group relative overflow-hidden flex items-center justify-center gap-3 rounded-4xl border border-white/40 bg-white/60 backdrop-blur-xl px-8 py-4 text-base font-semibold tracking-[0.5px] text-[#24163b] shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] active:scale-[0.98] cursor-pointer"
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  console.warn("Unknown button variant:", variant);

  return null;
}

export default Button;
