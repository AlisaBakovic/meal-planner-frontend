import { useState } from "react";
import NavButton from "../components/NavButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f6fc]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 -z-20 h-full w-full object-cover opacity-20"
      >
        <source src="/video/bg-reverse.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/30 to-transparent"></div>

      <div className="fixed top-4 left-0 z-50 w-full px-6">
        <div className="relative flex items-center justify-between">
          <img
            src="/picture/MealMapLogo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            className="h-16 cursor-pointer object-contain"
          />

          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <div className="flex items-center gap-10 rounded-full border border-white/30 bg-white/20 px-8 py-4 shadow-[0_8px_32px_rgba(31,38,135,0.12)] backdrop-blur-2xl">
              <NavButton onClick={() => navigate("/")}>About</NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton onClick={() => navigate("/features")}>
                Features
              </NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>How it works</NavButton>
            </div>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => navigate("/login")}>Sign in</Button>
          </div>

          <div className="relative z-[100] md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-[0_8px_32px_rgba(31,38,135,0.18)] backdrop-blur-2xl transition-all duration-150 duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
            >
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-[9px] rotate-45" : ""
                  }`}
                />

                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />

                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed top-24 right-6 z-[999] w-72 overflow-hidden rounded-[32px] border border-white/30 bg-white/70 p-5 shadow-[0_20px_60px_rgba(31,38,135,0.18)] backdrop-blur-2xl transition-all duration-300 md:hidden">
          <div className="flex flex-col gap-2">
            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">
              <NavButton onClick={() => navigate("/")}>About</NavButton>
            </div>

            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">
              <NavButton onClick={() => navigate("/features")}>
                Features
              </NavButton>
            </div>

            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">
              <NavButton>How it works</NavButton>
            </div>

            <div className="mt-3 border-t border-[#e7dcff] pt-3">
              <Button onClick={() => navigate("/login")}>Sign in</Button>
            </div>
          </div>
        </div>
      )}

      <section className="relative z-10 px-6 pt-44 pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="inline-flex items-center rounded-full border border-white/30 bg-white/30 px-6 py-3 text-sm tracking-[0.18em] text-[#7c6f9a] uppercase backdrop-blur-xl"
            style={{ fontFamily: "Open Sans" }}
          >
            Powerful Nutrition Workflow
          </div>

          <h1
            className="mt-8 text-[56px] leading-[0.95] font-[800] tracking-[-0.06em] text-[#1f1637] sm:text-[82px]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Everything you need
            <br />
            to manage nutrition
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ff8a4c] bg-clip-text text-transparent">
              {" "}
              beautifully.
            </span>
          </h1>

          <p
            className="mx-auto mt-8 max-w-3xl text-[20px] leading-[1.8] text-[#5f6f66]"
            style={{ fontFamily: "Open Sans" }}
          >
            MealMap helps nutrition coaches organize clients, create
            personalized plans, manage meals and simplify their entire coaching
            workflow in one elegant platform.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-2xl font-bold text-white">
              01
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Client Management
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              Organize and manage all your nutrition clients in one modern
              dashboard experience.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] text-2xl font-bold text-white">
              02
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Personalized Plans
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              Create detailed nutrition plans tailored specifically for each
              client and their goals.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-2xl font-bold text-white">
              03
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Smart Food Database
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              Build meals quickly using reusable food items with automatic macro
              calculations.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#34d399] to-[#10b981] text-2xl font-bold text-white">
              04
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Progress Tracking
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              Allow clients to monitor nutrition progress and stay consistent
              with their goals.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-2xl font-bold text-white">
              05
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Invite System
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              Easily onboard clients through secure invitation-based
              registration flows.
            </p>
          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)] backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#f97316] to-[#fb7185] text-2xl font-bold text-white">
              06
            </div>

            <h3
              className="mt-8 text-[34px] leading-tight font-[700] text-[#1f1637]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Secure Authentication
            </h3>

            <p
              className="mt-5 text-[18px] leading-[1.8] text-[#5f6f66]"
              style={{ fontFamily: "Open Sans" }}
            >
              JWT-based authentication with protected routes and role-based
              access control.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
