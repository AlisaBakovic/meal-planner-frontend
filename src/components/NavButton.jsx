function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "Open Sans" }}
      className="flex items-center justify-center
whitespace-nowrap

text-[15px]
      font-[400]
      tracking-[0.12em]
      text-[#2d2342]
      uppercase

transition-all duration-300
hover:text-white"
    >
      {children}
    </button>
  );
}

export default NavButton;
