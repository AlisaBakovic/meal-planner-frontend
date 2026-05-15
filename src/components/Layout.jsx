import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="
        relative

        min-h-screen

        bg-[url('/picture/Purple-bg-homepage.png')]
        bg-cover
        bg-center
        bg-no-repeat

        overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0

          bg-gradient-to-r
          from-[#f7f4ff]/90
          via-[#f7f4ff]/45
          to-[#f7f4ff]/20

          backdrop-blur-[2px]

          z-0
        "
      />

      <div className="relative z-20 p-6">
        <div className="grid grid-cols-3 items-center pt-3">
          <div className="pl-6 flex items-center">
            <img
              src="/picture/Logo.png"
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="flex justify-center">
            <div
              className="
                flex items-center gap-10

                rounded-full

                border border-white/20

                bg-white/20
                backdrop-blur-2xl

                px-10 py-4

                shadow-[0_8px_32px_rgba(31,38,135,0.18)]
              "
            >
              <NavButton onClick={() => navigate("/")}>Home</NavButton>

              <div className="h-6 w-px bg-gray-500/50" />

              <NavButton>Clients</NavButton>

              <div className="h-6 w-px bg-gray-500/50" />

              <NavButton>Plans</NavButton>

              <div className="h-6 w-px bg-gray-500/50" />

              <NavButton>Food list</NavButton>
            </div>
          </div>

          <div className="flex justify-end pr-6">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div
          className="
            relative z-20

            mt-8

            bg-white/70
            backdrop-blur-2xl

            border border-white/30

            rounded-[32px]

            shadow-[0_8px_32px_rgba(31,38,135,0.12)]

            p-8

            min-h-[calc(100vh-140px)]
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
