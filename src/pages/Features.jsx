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
        className="fixed inset-0 h-full w-full object-cover opacity-20 -z-20"
      >
        <source src="/video/bg-reverse.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-transparent -z-10"></div>

      <div className="fixed top-4 left-0 w-full z-50 px-6">

        <div className="relative flex items-center justify-between">

          <img
            src="/picture/MealMapLogo.png"
            alt="Logo"
            onClick={() => navigate("/")}
            className="cursor-pointer h-16 object-contain"
          />

          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">

            <div className="flex items-center gap-10 rounded-full border border-white/30 bg-white/20 backdrop-blur-2xl px-8 py-4 shadow-[0_8px_32px_rgba(31,38,135,0.12)]">

              <NavButton onClick={() => navigate("/")}>
                About
              </NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton onClick={() => navigate("/features")}>
                Features
              </NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>
                How it works
              </NavButton>

            </div>

          </div>

          <div className="hidden md:block">

            <Button onClick={() => navigate("/login")}>
              Sign in
            </Button>

          </div>

          <div className="md:hidden relative z-[100]">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)] transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >

              <div className="relative flex h-5 w-6 flex-col justify-between">

                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-[9px] rotate-45"
                      : ""
                  }`}
                />

                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                />

                <span
                  className={`h-[2px] w-6 rounded-full bg-[#1f1637] transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-translate-y-[9px] -rotate-45"
                      : ""
                  }`}
                />

              </div>

            </button>

          </div>

        </div>

      </div>

      {mobileMenuOpen && (

        <div className="fixed right-6 top-24 z-[999] w-72 overflow-hidden rounded-[32px] border border-white/30 bg-white/70 backdrop-blur-2xl p-5 shadow-[0_20px_60px_rgba(31,38,135,0.18)] transition-all duration-300 md:hidden">

          <div className="flex flex-col gap-2">

            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">

              <NavButton onClick={() => navigate("/")}>
                About
              </NavButton>

            </div>

            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">

              <NavButton onClick={() => navigate("/features")}>
                Features
              </NavButton>

            </div>

            <div className="rounded-2xl transition-all hover:bg-[#f4efff]">

              <NavButton>
                How it works
              </NavButton>

            </div>

            <div className="pt-3 mt-3 border-t border-[#e7dcff]">

              <Button onClick={() => navigate("/login")}>
                Sign in
              </Button>

            </div>

          </div>

        </div>

      )}

      <section className="relative z-10 px-6 pt-44 pb-24">

        <div className="max-w-5xl mx-auto text-center">

          <div
            className="inline-flex items-center rounded-full border border-white/30 bg-white/30 backdrop-blur-xl px-6 py-3 text-sm uppercase tracking-[0.18em] text-[#7c6f9a]"
            style={{ fontFamily: "Open Sans" }}
          >
            Powerful Nutrition Workflow
          </div>

          <h1
            className="mt-8 text-[56px] sm:text-[82px] leading-[0.95] tracking-[-0.06em] font-[800] text-[#1f1637]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Everything you need
            <br />
            to manage nutrition
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#ff8a4c] bg-clip-text text-transparent">
              {" "}beautifully.
            </span>
          </h1>

          <p
            className="mt-8 max-w-3xl mx-auto text-[20px] leading-[1.8] text-[#5f6f66]"
            style={{ fontFamily: "Open Sans" }}
          >
            MealMap helps nutrition coaches organize clients, create personalized plans,
            manage meals and simplify their entire coaching workflow in one elegant platform.
          </p>

        </div>

      </section>

      <section className="relative z-10 px-6 pb-28">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-2xl font-bold">
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
              Organize and manage all your nutrition clients in one modern dashboard experience.
            </p>

          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] text-white text-2xl font-bold">
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
              Create detailed nutrition plans tailored specifically for each client and their goals.
            </p>

          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white text-2xl font-bold">
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
              Build meals quickly using reusable food items with automatic macro calculations.
            </p>

          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#34d399] to-[#10b981] text-white text-2xl font-bold">
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
              Allow clients to monitor nutrition progress and stay consistent with their goals.
            </p>

          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-2xl font-bold">
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
              Easily onboard clients through secure invitation-based registration flows.
            </p>

          </div>

          <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(31,38,135,0.08)]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white text-2xl font-bold">
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
              JWT-based authentication with protected routes and role-based access control.
            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Features;

