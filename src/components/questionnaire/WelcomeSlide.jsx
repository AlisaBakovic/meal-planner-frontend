import Button from "../Button";

function WelcomeSlide({ onNext }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-10 md:p-16">

      <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Questionnaire
      </p>

      <h1
        className="text-5xl md:text-6xl font-bold text-[#24163b] text-center mt-4"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Let's get to know you
      </h1>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-6" />

      <p className="text-[#8d87a1] text-center text-lg leading-8 mt-8 max-w-2xl mx-auto">
        This short questionnaire helps your trainer understand your lifestyle,
        nutrition preferences and health background in order to create a
        personalized meal plan tailored specifically to you.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-14">

        <div className="rounded-3xl bg-white border border-[#ece8ff] p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8d87a1]">
            Duration
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
            ~2 min
          </h3>
        </div>

        <div className="rounded-3xl bg-white border border-[#ece8ff] p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8d87a1]">
            Editing
          </p>

          <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
            24 hrs
          </h3>
        </div>

        <div className="rounded-3xl bg-white border border-[#ece8ff] p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8d87a1]">
            Privacy
          </p>

          <h3 className="mt-3 text-xl font-bold text-[#24163b]">
            Trainer Only
          </h3>
        </div>

      </div>

      <p className="text-center text-sm text-[#a19ab8] mt-10">
        Your answers can be edited for the first <strong>24 hours</strong>.
        After that, the questionnaire will be locked until your trainer reviews it.
      </p>

      <div className="flex justify-center mt-12">
        <Button onClick={onNext}>
          Start Questionnaire
        </Button>
      </div>

    </div>
  );
}

export default WelcomeSlide;