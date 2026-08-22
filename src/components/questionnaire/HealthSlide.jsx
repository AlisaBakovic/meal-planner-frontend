import QuestionTextarea from "./QuestionTextarea";
import NavigationButtons from "./NavigationButtons";

function HealthSlide({ answers, setAnswers, onNext, onBack }) {
  const health = answers.health;

  const updateField = (field, value) => {
    setAnswers({
      ...answers,
      health: {
        ...health,
        [field]: value,
      },
    });
  };

  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
      <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
        Step 4 of 6
      </p>

      <h2
        className="mt-4 text-center text-4xl font-bold text-[#24163b] md:text-5xl"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Your Health Information
      </h2>
      <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

      <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-[#8d87a1]">
        Share any health information that may help your trainer create a safer
        and more personalized nutrition plan.
      </p>

      <p className="mt-4 mb-10 text-center text-sm text-[#a19ab8]">
        All information is confidential and will only be visible to your
        assigned trainer.
      </p>

      <div className="space-y-10">
        <QuestionTextarea
          label="Allergies"
          value={health.allergies}
          placeholder="e.g. Peanuts, lactose, gluten..."
          onChange={(e) => updateField("allergies", e.target.value)}
        />
        <QuestionTextarea
          label="Medical Conditions"
          value={health.medical_conditions}
          placeholder="e.g. Diabetes, thyroid disorder..."
          onChange={(e) => updateField("medical_conditions", e.target.value)}
        />
        <QuestionTextarea
          label="Medications"
          value={health.medications}
          placeholder="e.g. Vitamin D, Iron supplements..."
          onChange={(e) => updateField("medications", e.target.value)}
        />
        <QuestionTextarea
          label="Injuries"
          value={health.injuries}
          placeholder="e.g. Knee injury, lower back pain..."
          onChange={(e) => updateField("injuries", e.target.value)}
        />
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}
export default HealthSlide;
