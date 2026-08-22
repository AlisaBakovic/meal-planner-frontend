import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Hero() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <section className="relative flex min-h-screen items-center overflow-visible px-8 lg:px-24">
      <div className="absolute top-0 right-0 bottom-[-120px] left-0 z-10 bg-gradient-to-r from-[#f7f4ff]/90 via-[#f7f4ff]/35 to-transparent" />

      <div className="relative z-20 max-w-2xl">
        <div
          className="mt-20 mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/30 px-5 py-2 text-sm tracking-[0.14em] text-[#5d5474] uppercase backdrop-blur-xl"
          style={{ fontFamily: "Open Sans" }}
        >
          Smart Nutrition Platform
        </div>

        <h1
          className="text-[64px] leading-[0.92] font-[800] tracking-[-0.06em] text-[#21113d] lg:text-[88px]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Build nutrition
          <br />
          plans
          <span className="bg-gradient-to-r from-[#a945ff] to-[#792bdd] bg-clip-text text-transparent">
            {" "}
            faster.
          </span>
        </h1>

        <p
          className="mt-8 max-w-xl text-[20px] leading-[1.7] text-[#5d5474]"
          style={{ fontFamily: "Open Sans" }}
        >
          Create personalized meal plans, manage clients and simplify your
          nutrition workflow in one modern platform.
        </p>

        {token ? (
          <div className="mt-10 flex items-center gap-5">
            <Button onClick={() => navigate("/dashboard")}>
              Go to dashboard →
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex items-center gap-5">
            <Button onClick={() => navigate("/signup")}>Get started</Button>

            <Button variant="secondary" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
