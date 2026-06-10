import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";

function Layout({ children, mode = "trainer" }) {

  const navigate = useNavigate();

  const isClient = mode === "client";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {

    const role = localStorage.getItem("role");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("first_name");

    if (role === "client") {

      navigate("/login?mode=client");

    } else {

      navigate("/login");

    }

  };

  const token = localStorage.getItem("token");

  const isLoggedIn = !!token;

  return (

    <div
      className={`relative min-h-screen overflow-hidden ${
        isClient
          ? "bg-[url('/picture/Client-bg-homepage.png')] bg-cover bg-center bg-no-repeat"
          : "bg-[url('/picture/Purple-bg-homepage.png')] bg-cover bg-center bg-no-repeat"
      }`}
    >

      <div
        className={`absolute inset-0 backdrop-blur-[3px] z-0 ${
          isClient
            ? "bg-gradient-to-br from-[#7ec7a2]/55 via-[#d7f5e6]/20 to-[#ffcf8f]/20"
            : "bg-gradient-to-r from-[#f7f4ff]/90 via-[#f7f4ff]/45 to-[#f7f4ff]/20"
        }`}
      />

      <div className="relative z-20 p-4 sm:p-6">

        <div className="flex items-center justify-between pt-3">

          <div className="pl-2 sm:pl-6 flex items-center shrink-0 cursor-pointer"
            onClick={() => navigate("/")}>

            <img
              src="/picture/MealMapLogo.png"
              alt="Logo"
              className="cursor-pointer h-14 sm:h-16 md:h-20 w-auto object-contain"
            />

          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">

            <div
              className={`flex items-center gap-8 xl:gap-10 rounded-full border backdrop-blur-2xl px-8 xl:px-10 py-4 shadow-[0_8px_32px_rgba(31,38,135,0.18)] ${
                isClient
                  ? "border-white/30 bg-white/15"
                  : "border-white/20 bg-white/20"
              }`}
            >

              <NavButton onClick={() => navigate(isClient ? "/client-welcome" : "/")}>
                Home
              </NavButton>

              <div className="h-6 w-px bg-gray-500/50" />

              {isLoggedIn ? (

                <>

                  <NavButton>
                    {isClient ? "My Plan" : "Clients"}
                  </NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton>
                    {isClient ? "Progress" : "Plans"}
                  </NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton>
                    {isClient ? "Questionnaire" : "Food list"}
                  </NavButton>

                </>

              ) : (

                <>

                  <NavButton onClick={() => navigate("/features")}>
                    Features
                  </NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton>
                    How it works
                  </NavButton>

                </>

              )}

            </div>

          </div>

          {token ? (

            <div className="hidden lg:flex justify-end pr-6">

              <Button onClick={handleLogout}>
                Logout
              </Button>

            </div>

          ) : null}

          <div className="lg:hidden relative">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)] transition-all duration-300 hover:scale-105 cursor-pointer ${
                isClient
                  ? "border-white/30 bg-white/15 hover:bg-white/20"
                  : "border-white/20 bg-white/15 hover:bg-white/20"
              }`}
            >

              <div className="relative flex h-5 w-6 flex-col justify-between">

                <span
                  className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isClient ? "bg-[#3d4a42]" : "bg-[#24163b]"
                  } ${mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""}`}
                ></span>

                <span
                  className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isClient ? "bg-[#3d4a42]" : "bg-[#24163b]"
                  } ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>

                <span
                  className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isClient ? "bg-[#3d4a42]" : "bg-[#24163b]"
                  } ${mobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
                ></span>

              </div>

            </button>

            {mobileMenuOpen && (

              <div
                className={`absolute right-0 top-[72px] z-[999] w-72 overflow-hidden rounded-[32px] border backdrop-blur-2xl p-5 shadow-[0_20px_60px_rgba(31,38,135,0.18)] transition-all duration-300 ${
                  isClient
                    ? "border-white/30 bg-white/60"
                    : "border-white/30 bg-white/70"
                }`}
              >

                <div className="flex flex-col gap-2">

                  <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                    <NavButton onClick={() => navigate(isClient ? "/client-welcome" : "/")}>
                      Home
                    </NavButton>

                  </div>

                  {isLoggedIn ? (

                    <>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton>
                          {isClient ? "My Plan" : "Clients"}
                        </NavButton>

                      </div>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton>
                          {isClient ? "Progress" : "Plans"}
                        </NavButton>

                      </div>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton>
                          {isClient ? "Questionnaire" : "Food list"}
                        </NavButton>

                      </div>

                    </>

                  ) : (

                    <>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton onClick={() => navigate("/features")}>
                          Features
                        </NavButton>

                      </div>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton>
                          How it works
                        </NavButton>

                      </div>

                      <div className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}>

                        <NavButton onClick={() => navigate("/signup")}>
                          Register
                        </NavButton>

                      </div>

                    </>

                  )}

                  {token && (

                    <div className={`pt-3 mt-3 border-t ${isClient ? "border-[#dcebdd]" : "border-[#e7dcff]"}`}>

                      <Button onClick={handleLogout}>
                        Logout
                      </Button>

                    </div>

                  )}

                </div>

              </div>

            )}

          </div>

        </div>

        <div className="relative z-20 mt-6 sm:mt-8">

          {children}

        </div>

      </div>

    </div>

  );

}

export default Layout;

