function Button({ children, onClick, variant = "primary" }) {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        style={{ fontFamily: "Open Sans" }}
        className="group flex items-center gap-4 rounded-full 
        bg-gradient-to-r from-purple-500 to-[rgb(103,30,206)]
        px-8 py-4 text-lg font-bold tracking-wide text-white
        shadow-[0_10px_30px_rgba(98,0,255,0.35)]
        transition-all duration-300
        hover:scale-105 hover:shadow-[0_15px_40px_rgba(98,0,255,0.5)]
        transition-all duration-300 ease-in-out
        hover:tracking-[3px]
        drop-shadow-lg/30

        before:content-['']
        before:absolute before:left-1/2 before:-translate-x-1/2
        before:top-1 before:w-0 before:h-[1px]
        before:bg-[rgb(255,255,255)]
        before:transition-all before:duration-300

        after:content-['']
        after:absolute after:left-1/2 after:-translate-x-1/2
        after:bottom-1 after:w-0
        after:border-b after:border-[rgb(255,255,255)]
        after:transition-all after:duration-300
        "
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        onClick={onClick}
        style={{ fontFamily: "Open Sans" }}
        className="relative min-w-[180px] text-center
        px-10 py-2 px-8 py-4 text-lg font-bold
        rounded-full
        text-white px-8 py-4 text-lg font-bold tracking-[1px]
        bg-mauve-50/30
        transition-all duration-300 ease-in-out
        drop-shadow-lg/30

        hover:tracking-[3px]
        hover:scale-x-110

        before:content-['']
        before:absolute before:left-1/2 before:-translate-x-1/2
        before:top-1 before:w-0 before:h-[1px]
        before:bg-[rgb(255,255,255)]
        before:transition-all before:duration-300

        after:content-['']
        after:absolute after:left-1/2 after:-translate-x-1/2
        after:bottom-1 after:w-0
        after:border-b after:border-[rgb(255,255,255)]
        after:transition-all after:duration-300
        "
      >
        {children}
      </button>
    );
  }
  console.warn("Unknown button variant:", variant);
  return null;
}

export default Button;
