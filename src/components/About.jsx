function About({ scrollY }) {
  return (
    <section className="relative z-20 rounded-t-[50px] bg-gradient-to-b from-[#f7f5ff] via-[#f7f5ff] via-85% to-[#f7f5ffa9] px-6 py-28 shadow-[0_-20px_60px_rgba(120,90,255,0.08)] backdrop-blur-sm">
      <div className="absolute top-0 right-0 left-0 h-20 rounded-t-[50px] bg-gradient-to-b from-white/50 to-[#f7f5ff] backdrop-blur-xl" />

      <div
        id="about"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-40 text-center transition-all duration-700"
        style={{
          opacity: scrollY > 200 ? 1 : 0,
          transform: scrollY > 200 ? "translateY(0px)" : "translateY(40px)",
        }}
      >
        <div className="mt-24 grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div>
            <p
              className="mb-6 text-sm tracking-[0.18em] text-[#8a7ca8] uppercase"
              style={{ fontFamily: "Open Sans" }}
            >
              ABOUT PLATFORM
            </p>

            <h2
              className="text-6xl leading-[0.95] font-[800] tracking-[-0.05em] text-[#24163b]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Smart nutrition
              <br />
              planning for
              <br />
              modern coaches.
            </h2>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-[#6f6884]"
              style={{ fontFamily: "Open Sans" }}
            >
              MealMap helps coaches organize meal plans, manage clients and
              simplify nutrition workflows in one beautiful workspace.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[34px] border border-white/40 bg-white/70 p-8 shadow-[0_10px_40px_rgba(120,90,255,0.08)] backdrop-blur-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eee8ff] text-2xl text-[#6c3df5]">
                ✦
              </div>

              <h3
                className="mb-3 text-2xl font-bold text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Personalized Plans
              </h3>

              <p
                className="leading-relaxed text-[#6f6884]"
                style={{ fontFamily: "Open Sans" }}
              >
                Build meal plans tailored to each client’s unique goals and
                preferences.
              </p>
            </div>

            <div className="rounded-[34px] bg-[#6c3df5] p-8 shadow-[0_10px_40px_rgba(108,61,245,0.25)]">
              <h3
                className="mb-4 text-3xl leading-tight font-bold text-white"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Save hours every week.
              </h3>

              <p
                className="leading-relaxed text-white/80"
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
