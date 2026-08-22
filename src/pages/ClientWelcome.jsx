import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import NavButton from "../components/NavButton";

function ClientWelcome() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("first_name");

    navigate("/client-welcome");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 -z-20 h-full w-full object-cover"
      >
        <source src="/video/Client_bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,183,77,0.18),transparent_30%)]"></div>

      <div className="fixed top-4 left-0 z-50 w-full px-4 sm:top-6 sm:px-6">
        <div className="relative flex items-center justify-between">
          <div className="shrink-0">
            <img
              src="/picture/MealMapLogo.png"
              alt="Logo"
              className="h-14 w-auto object-contain sm:h-16 md:h-18"
            />
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <div className="flex w-fit max-w-5xl items-center gap-8 rounded-full border border-white/30 bg-white/20 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:gap-10 lg:px-8 lg:py-4">
              <NavButton>Nutrition</NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>Wellness</NavButton>

              <div className="h-6 w-px bg-[#94a3b8]/40" />

              <NavButton>Healthy Habits</NavButton>
            </div>
          </div>

          <div>
            {!token ? (
              <Button onClick={() => navigate("/login?mode=client")}>
                Sign In
              </Button>
            ) : (
              <Button onClick={handleLogout}>Log out</Button>
            )}
          </div>
        </div>
      </div>

      <section className="relative flex min-h-screen items-center overflow-visible px-6 pt-32 pb-20 sm:px-8 lg:px-24">
        <div className="absolute top-0 right-0 bottom-[-120px] left-0 z-10 bg-gradient-to-r from-[#f9fff9]/90 via-[#f9fff9]/35 to-transparent"></div>

        <div className="relative z-20 max-w-2xl">
          <div
            className="mt-10 mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/30 px-5 py-2 text-sm tracking-[0.14em] text-[#5f6f66] uppercase backdrop-blur-xl"
            style={{ fontFamily: "Open Sans" }}
          >
            Personalized Nutrition Experience
          </div>

          <h1
            className="text-[48px] leading-[0.92] font-[800] tracking-[-0.06em] text-[#1f2937] sm:text-[64px] lg:text-[88px]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Your wellness
            <br />
            journey starts
            <span className="bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] bg-clip-text text-transparent">
              {" "}
              here.
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-[18px] leading-[1.7] text-[#5f6f66] sm:text-[20px]"
            style={{ fontFamily: "Open Sans" }}
          >
            Access your personalized meal plans, nutrition guidance and coaching
            experience designed specifically for your goals.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {!token ? (
              <Button onClick={() => navigate("/login?mode=client")}>
                Continue to Login
              </Button>
            ) : (
              <Button onClick={() => navigate("/client-dashboard")}>
                Go to dashboard
              </Button>
            )}

            <button className="w-full rounded-full border border-[#ffb84d]/30 bg-white/40 px-7 py-4 font-medium text-[#ff944d] backdrop-blur-xl transition-all duration-150 hover:bg-white/60 active:scale-95 sm:w-auto">
              Explore Platform
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientWelcome;
