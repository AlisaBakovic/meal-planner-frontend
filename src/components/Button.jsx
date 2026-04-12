function Button({ children, onClick, variant = "primary" }) {
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        style={{ fontFamily: "Open Sans" }}
        className="relative inline-block
        px-10 py-2
        rounded-full
        text-white text-sm uppercase tracking-[1px]
        bg-[rgba(137,91,178,0.74)]
        border
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
        px-10 py-2
        rounded-full
        text-white text-sm uppercase tracking-[1px]
        bg-mauve-50/30
        border
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