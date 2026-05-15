import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative

        flex items-center

        min-h-screen

        px-8 lg:px-24

        overflow-visible
      "
    >
      <div
        className="
    absolute top-0
    left-0
    right-0
    bottom-[-120px]

    bg-gradient-to-r
    from-[#f7f4ff]/90
    via-[#f7f4ff]/35
    to-transparent

    z-10
  "
      />

      <div
        className="
          relative z-20

          max-w-2xl
        "
      >
        <div
          className="
            inline-flex items-center

            rounded-full

            bg-white/30
            backdrop-blur-xl

            border border-white/30

            px-5 py-2

            text-[#5d5474]
            text-sm
            tracking-[0.14em]
            uppercase
            mt-20

            mb-8
          "
          style={{ fontFamily: "Open Sans" }}
        >
          Smart Nutrition Platform
        </div>

        <h1
          className="
            text-[64px]
            lg:text-[88px]

            leading-[0.92]
            tracking-[-0.06em]

            font-[800]

            text-[#21113d]
          "
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Build nutrition
          <br />
          plans
          <span
            className="
              bg-gradient-to-r
              from-[#a945ff]
              to-[#792bdd]

              bg-clip-text
              text-transparent
            "
          >
            {" "}
            faster.
          </span>
        </h1>

        <p
          className="
            mt-8

            max-w-xl

            text-[20px]
            leading-[1.7]

            text-[#5d5474]
          "
          style={{ fontFamily: "Open Sans" }}
        >
          Create personalized meal plans, manage clients and simplify your
          nutrition workflow in one modern platform.
        </p>

        <div className="flex items-center gap-5 mt-10">
          <Button onClick={() => navigate("/signup")}>Get started</Button>

          <Button variant="secondary" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
