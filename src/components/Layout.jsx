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
        className={`absolute inset-0 z-0 backdrop-blur-[3px] ${
          isClient
            ? "bg-gradient-to-br from-[#7ec7a2]/55 via-[#d7f5e6]/20 to-[#ffcf8f]/20"
            : "bg-gradient-to-r from-[#f7f4ff]/90 via-[#f7f4ff]/45 to-[#f7f4ff]/20"
        }`}
      />

      <div className="relative z-20 p-4 sm:p-6">
        <div className="flex items-center justify-between pt-3">
          <div
            className="flex shrink-0 cursor-pointer items-center pl-2 sm:pl-6"
            onClick={() => navigate("/")}
          >
            <img
              src="/picture/MealMapLogo.png"
              alt="Logo"
              className="h-14 w-auto cursor-pointer object-contain sm:h-16 md:h-20"
            />
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 lg:flex">
            <div
              className={`flex items-center gap-8 rounded-full border px-8 py-4 shadow-[0_8px_32px_rgba(31,38,135,0.18)] backdrop-blur-2xl xl:gap-10 xl:px-10 ${
                isClient
                  ? "border-white/30 bg-white/15"
                  : "border-white/20 bg-white/20"
              }`}
            >
              <NavButton
                onClick={() => navigate(isClient ? "/client-welcome" : "/")}
              >
                Home
              </NavButton>

              <div className="h-6 w-px bg-gray-500/50" />

              {isLoggedIn ? (
                <>
                  <NavButton>{isClient ? "My Plan" : "Clients"}</NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton>{isClient ? "Progress" : "Plans"}</NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton
                    onClick={() =>
                      navigate(isClient ? "/questionnaire" : "/foods")
                    }
                  >
                    {isClient ? "Questionnaire" : "Food List"}
                  </NavButton>
                </>
              ) : (
                <>
                  <NavButton onClick={() => navigate("/features")}>
                    Features
                  </NavButton>

                  <div className="h-6 w-px bg-gray-500/50" />

                  <NavButton>How it works</NavButton>
                </>
              )}
            </div>
          </div>

          {token ? (
            <div className="hidden justify-end pr-6 lg:flex">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : null}

          <div className="relative lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border shadow-[0_8px_32px_rgba(31,38,135,0.18)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 ${
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
                className={`absolute top-[72px] right-0 z-[999] w-72 overflow-hidden rounded-[32px] border p-5 shadow-[0_20px_60px_rgba(31,38,135,0.18)] backdrop-blur-2xl transition-all duration-300 ${
                  isClient
                    ? "border-white/30 bg-white/60"
                    : "border-white/30 bg-white/70"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                  >
                    <NavButton
                      onClick={() =>
                        navigate(isClient ? "/client-welcome" : "/")
                      }
                    >
                      Home
                    </NavButton>
                  </div>

                  {isLoggedIn ? (
                    <>
                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton>
                          {isClient ? "My Plan" : "Clients"}
                        </NavButton>
                      </div>

                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton>{isClient ? "Progress" : "Plans"}</NavButton>
                      </div>

                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton
                          onClick={() =>
                            navigate(isClient ? "/questionnaire" : "/foods")
                          }
                        >
                          {isClient ? "Questionnaire" : "Food List"}
                        </NavButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton onClick={() => navigate("/features")}>
                          Features
                        </NavButton>
                      </div>

                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton>How it works</NavButton>
                      </div>

                      <div
                        className={`rounded-2xl transition-all ${isClient ? "hover:bg-[#eef8f0]" : "hover:bg-[#f4efff]"}`}
                      >
                        <NavButton onClick={() => navigate("/signup")}>
                          Register
                        </NavButton>
                      </div>
                    </>
                  )}

                  {token && (
                    <div
                      className={`mt-3 border-t pt-3 ${isClient ? "border-[#dcebdd]" : "border-[#e7dcff]"}`}
                    >
                      <Button onClick={handleLogout}>Logout</Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-20 mt-6 sm:mt-8">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
