function About({ scrollY }) {
  return (
    <section
      className="
        relative z-20
        rounded-t-[50px]
        
        bg-gradient-to-b from-[#f7f5ff] via-[#f7f5ff] via-85% to-[#f7f5ffa9]
        backdrop-blur-sm

        px-6
        py-28
        
        shadow-[0_-20px_60px_rgba(120,90,255,0.08)]
      "
    >
      <div
        className="
          absolute top-0 left-0 right-0

          h-20

          rounded-t-[50px]

          bg-gradient-to-b
          from-white/50
          to-[#f7f5ff]
    
          backdrop-blur-xl
        "
      />

      <div
        id="about"
        className="
          relative z-10

          scroll-mt-40

          max-w-7xl
          mx-auto

          text-center

          transition-all
          duration-700
        "
        style={{
          opacity: scrollY > 200 ? 1 : 0,
          transform: scrollY > 200 ? "translateY(0px)" : "translateY(40px)",
        }}
      >
        <div
          className="
    grid
    grid-cols-1 lg:grid-cols-2

    gap-16

    items-start

    mt-24
  "
        >
          <div>
            <p
              className="
        text-sm
        uppercase
        tracking-[0.18em]

        text-[#8a7ca8]

        mb-6
      "
              style={{ fontFamily: "Open Sans" }}
            >
              ABOUT PLATFORM
            </p>

            <h2
              className="
        text-6xl
        leading-[0.95]
        tracking-[-0.05em]

        font-[800]

        text-[#24163b]
      "
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Smart nutrition
              <br />
              planning for
              <br />
              modern coaches.
            </h2>

            <p
              className="
        mt-8

        text-lg
        leading-relaxed

        text-[#6f6884]

        max-w-xl
      "
              style={{ fontFamily: "Open Sans" }}
            >
              MealMap helps coaches organize meal plans, manage clients and
              simplify nutrition workflows in one beautiful workspace.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div
              className="
        bg-white/70
        backdrop-blur-xl

        rounded-[34px]

        p-8

        border border-white/40

        shadow-[0_10px_40px_rgba(120,90,255,0.08)]
      "
            >
              <div
                className="
          w-14 h-14

          rounded-2xl

          bg-[#eee8ff]

          flex items-center justify-center

          text-[#6c3df5]
          text-2xl

          mb-6
        "
              >
                ✦
              </div>

              <h3
                className="
          text-2xl
          font-bold
          text-[#24163b]
          mb-3
        "
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Personalized Plans
              </h3>

              <p
                className="
          text-[#6f6884]
          leading-relaxed
        "
                style={{ fontFamily: "Open Sans" }}
              >
                Build meal plans tailored to each client’s unique goals and
                preferences.
              </p>
            </div>

            <div
              className="
        bg-[#6c3df5]

        rounded-[34px]

        p-8

        shadow-[0_10px_40px_rgba(108,61,245,0.25)]
      "
            >
              <h3
                className="
          text-3xl
          leading-tight
          font-bold

          text-white
          mb-4
        "
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Save hours every week.
              </h3>

              <p
                className="
          text-white/80
          leading-relaxed
        "
                style={{ fontFamily: "Open Sans" }}
              >
                Automate repetitive nutrition planning tasks and focus more on
                your clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
