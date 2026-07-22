import { useEffect, useState } from "react";
import NavButton from "../components/NavButton";
import Hero from "../components/Hero";
import About from "../components/About";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import Features from "./Features";

function Home() {
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const isClient = role === "client";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-white/50 via-white/5 to-transparent -z-0"></div>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        style={{
          transform: `translateY(${Math.min(scrollY * 0.05, 0)}px)`,
        }}
      >
        <source src="/video/bg-reverse.mp4" type="video/mp4" />
      </video>

      <div className="fixed top-4 sm:top-6 left-0 w-full z-50 px-4 sm:px-6">
        <div className="relative flex items-center justify-between">
          <div className="shrink-0">
            <img
              src="/picture/MealMapLogo.png"
              alt="Logo"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer h-14 sm:h-16 md:h-18 w-auto object-contain"
            />
          </div>

          {token ? (
            <div className="hidden md:block" onClick={handleLogout}>
              <Button>Logout</Button>
            </div>
          ) : null}

          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <div className="flex items-center gap-8 lg:gap-10 w-fit max-w-5xl rounded-full border border-white/20 bg-white/15 backdrop-blur-2xl px-6 lg:px-8 py-3 lg:py-4 shadow-[0_8px_32px_rgba(31,38,135,0.18)]">
              <NavButton
                onClick={() =>
                  document
                    .getElementById("about")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                About
              </NavButton>

              <div className="h-6 w-px bg-gray-500/60" />

              <NavButton onClick={() => navigate("/features")}>
                Features
              </NavButton>

              <div className="h-6 w-px bg-gray-500/60" />

              <NavButton
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                How it works
              </NavButton>
            </div>
          </div>

          <div className="md:hidden relative z-[100]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)] transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer"
            >
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""}`}
                ></span>

                <span
                  className={`h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>

                <span
                  className={`h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
                ></span>
              </div>
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 top-[72px] w-64 overflow-hidden rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(31,38,135,0.25)] transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <div className="rounded-2xl transition-all hover:bg-white/10">
                    <NavButton
                      onClick={() =>
                        document
                          .getElementById("about")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      About
                    </NavButton>
                  </div>

                  <div className="rounded-2xl transition-all hover:bg-white/10">
                    <NavButton onClick={() => navigate("/features")}>
                      Features
                    </NavButton>
                  </div>

                  <div className="rounded-2xl transition-all hover:bg-white/10">
                    <NavButton
                      onClick={() =>
                        document
                          .getElementById("how-it-works")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      How it works
                    </NavButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
      </div>

      <div className="relative z-10">
        <About scrollY={scrollY} />
      </div>

      <div className="relative z-10">
        <HowItWorks scrollY={scrollY} />
      </div>
    </div>
  );
}

export default Home;
