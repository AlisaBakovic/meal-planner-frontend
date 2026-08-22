import QuestionCard from "./QuestionCard";
import QuestionInput from "./QuestionInput";
import NavigationButtons from "./NavigationButtons";

function LifestyleSlide({ answers, setAnswers, onNext, onBack }) {
  const lifestyle = answers.lifestyle;

  const updateField = (field, value) => {
    setAnswers({
      ...answers,
      lifestyle: {
        ...lifestyle,
        [field]: value,
      },
    });
  };

  const activityLevels = [
    {
      value: "sedentary",
      title: "Sedentary",
      subtitle: "Little or no exercise",
    },
    {
      value: "light",
      title: "Lightly Active",
      subtitle: "1–3 workouts per week",
    },
    {
      value: "moderate",
      title: "Moderately Active",
      subtitle: "3–5 workouts per week",
    },
    {
      value: "very",
      title: "Very Active",
      subtitle: "6+ workouts per week",
    },
  ];

  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
      <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
        Step 3 of 6
      </p>

      <h2
        className="mt-4 text-center text-4xl font-bold text-[#24163b] md:text-5xl"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Your lifestyle
      </h2>

      <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

      <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-[#8d87a1]">
        Tell us about your daily habits so we can estimate your energy needs.
      </p>

      <div className="space-y-8">
        <div>
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-sm font-semibold tracking-[0.18em] text-[#5a536e] uppercase">
              Activity Level
            </h3>

            <div className="space-y-5">
              {activityLevels.map((activity) => (
                <QuestionCard
                  key={activity.value}
                  title={activity.title}
                  subtitle={activity.subtitle}
                  selected={lifestyle.activity_level === activity.value}
                  onClick={() => updateField("activity_level", activity.value)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-18 grid gap-6 md:grid-cols-3">
          <QuestionInput
            label="Meals per Day"
            type="number"
            value={lifestyle.meals_per_day}
            onChange={(e) => updateField("meals_per_day", e.target.value)}
          />

          <QuestionInput
            label="Water Intake"
            type="number"
            value={lifestyle.water_intake}
            onChange={(e) => updateField("water_intake", e.target.value)}
            suffix="liter"
          />

          <QuestionInput
            label="Sleep"
            type="number"
            value={lifestyle.sleep_hours}
            onChange={(e) => updateField("sleep_hours", e.target.value)}
            suffix="h"
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

export default LifestyleSlide;
