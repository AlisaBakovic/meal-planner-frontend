import Button from "../Button";

function WelcomeSlide({ onNext }) {
  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-10 backdrop-blur-xl md:p-16">
      <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
        Questionnaire
      </p>

      <h1
        className="mt-4 text-center text-5xl font-bold text-[#24163b] md:text-6xl"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Let's get to know you
      </h1>

      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#9b6cff]" />

      <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-[#8d87a1]">
        This short questionnaire helps your trainer understand your lifestyle,
        nutrition preferences and health background in order to create a
        personalized meal plan tailored specifically to you.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-[#ece8ff] bg-white p-6 text-center shadow-sm">
          <p className="text-xs tracking-[0.18em] text-[#8d87a1] uppercase">
            Duration
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#24163b]">~2 min</h3>
        </div>

        <div className="rounded-3xl border border-[#ece8ff] bg-white p-6 text-center shadow-sm">
          <p className="text-xs tracking-[0.18em] text-[#8d87a1] uppercase">
            Editing
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#24163b]">24 hrs</h3>
        </div>

        <div className="rounded-3xl border border-[#ece8ff] bg-white p-6 text-center shadow-sm">
          <p className="text-xs tracking-[0.18em] text-[#8d87a1] uppercase">
            Privacy
          </p>

          <h3 className="mt-3 text-xl font-bold text-[#24163b]">
            Trainer Only
          </h3>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-[#a19ab8]">
        Your answers can be edited for the first <strong>24 hours</strong>.
        After that, the questionnaire will be locked until your trainer reviews
        it.
      </p>

      <div className="mt-12 flex justify-center">
        <Button onClick={onNext}>Start Questionnaire</Button>
      </div>
    </div>
  );
}

export default WelcomeSlide;
