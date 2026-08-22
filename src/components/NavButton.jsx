function NavButton({ children, onClick }) {
  const role = localStorage.getItem("role");
  const isClient = role === "client";

  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "Open Sans" }}
      className={`flex cursor-pointer items-center justify-center text-[15px] font-[400] tracking-[0.12em] whitespace-nowrap uppercase transition-all duration-200 hover:-translate-y-[1px] ${
        isClient
          ? "text-[#365314] hover:text-[#ff8a4c]"
          : "text-[#2d2342] hover:text-[#8b5cf6]"
      }`}
    >
      {children}
    </button>
  );
}

export default NavButton;
