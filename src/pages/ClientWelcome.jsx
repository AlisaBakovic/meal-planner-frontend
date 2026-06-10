import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NavButton from "../components/NavButton";

function ClientWelcome() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token")

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role");
    localStorage.removeItem("first_name");

    navigate("/client-welcome");
  }

  return (

    <div className="relative w-full min-h-screen overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/video/Client_bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,183,77,0.18),transparent_30%)]"></div>

      <div className="fixed top-4 sm:top-6 left-0 w-full z-50 px-4 sm:px-6">

        <div className="relative flex items-center justify-between">

          <div className="shrink-0">

            <img
              src="/picture/MealMapLogo.png"
              alt="Logo"
              className="h-14 sm:h-16 md:h-18 w-auto object-contain"
            />

          </div>

          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">

            <div className="flex items-center gap-8 lg:gap-10 w-fit max-w-5xl rounded-full border border-white/30 bg-white/20 backdrop-blur-2xl px-6 lg:px-8 py-3 lg:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">

              <NavButton>
                Nutrition
              </NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>
                Wellness
              </NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>
                Healthy Habits
              </NavButton>

            </div>

          </div>

          <div>

            {!token ? (
              <Button onClick={() => navigate("/login?mode=client")}>
              Sign In
            </Button>) : (
            <Button onClick={handleLogout}>
              Log out
            </Button>)}

          </div>

        </div>

      </div>

      <section className="relative flex items-center min-h-screen px-6 sm:px-8 lg:px-24 overflow-visible pt-32 pb-20">

        <div className="absolute top-0 left-0 right-0 bottom-[-120px] bg-gradient-to-r from-[#f9fff9]/90 via-[#f9fff9]/35 to-transparent z-10"></div>

        <div className="relative z-20 max-w-2xl">

          <div
            className="inline-flex items-center rounded-full bg-white/30 backdrop-blur-xl border border-white/30 px-5 py-2 text-[#5f6f66] text-sm tracking-[0.14em] uppercase mt-10 mb-8"
            style={{ fontFamily: "Open Sans" }}
          >
            Personalized Nutrition Experience
          </div>

          <h1
            className="text-[48px] sm:text-[64px] lg:text-[88px] leading-[0.92] tracking-[-0.06em] font-[800] text-[#1f2937]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Your wellness
            <br />
            journey starts
            <span className="bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] bg-clip-text text-transparent">
              {" "}here.
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-[18px] sm:text-[20px] leading-[1.7] text-[#5f6f66]"
            style={{ fontFamily: "Open Sans" }}
          >
            Access your personalized meal plans, nutrition guidance and coaching experience designed specifically for your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
              {!token ? (
              <Button onClick={() => navigate("/login?mode=client")}>
                Continue to Login
              </Button>
              ) : (<Button onClick={() => navigate("/client-dashboard")}>
                Go to dashboard
              </Button>)}
            

            <button
              className="w-full sm:w-auto rounded-full border border-[#ffb84d]/30 bg-white/40 backdrop-blur-xl px-7 py-4 text-[#ff944d] font-medium hover:bg-white/60 transition-all"
            >
              Explore Platform
            </button>

          </div>

        </div>

      </section>

    </div>

  );
}

export default ClientWelcome;