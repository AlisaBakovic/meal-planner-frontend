function NavButton({ children, onClick }) {

  const role = localStorage.getItem("role")
  const isClient = role === "client";

  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "Open Sans" }}
      className={` cursor-pointer flex items-center justify-center whitespace-nowrap text-[15px] font-[400] tracking-[0.12em] uppercase transition-all duration-300 ${isClient ? "text-[#365314] hover:text-[#ff8a4c]" : "text-[#2d2342] hover:text-white"}`}
    >
    {children}
    </button>   
  );
}

export default NavButton;
