import QuestionCard from "./QuestionCard";
import QuestionInput from "./QuestionInput";
import NavigationButtons from "./NavigationButtons";

function LifestyleSlide({
  answers,
  setAnswers,
  onNext,
  onBack,
}) {
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
      subtitle: "Little or no exercise"
    },
    {
      value: "light",
      title: "Lightly Active",
      subtitle: "1–3 workouts per week"
    },
    {
      value: "moderate",
      title: "Moderately Active",
      subtitle: "3–5 workouts per week"
    },
    {
      value: "very",
      title: "Very Active",
      subtitle: "6+ workouts per week"
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">

      <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Step 3 of 6
      </p>

      <h2
        className="text-4xl md:text-5xl font-bold text-[#24163b] text-center mt-4"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Your lifestyle
      </h2>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

      <p className="text-[#8d87a1] text-center mt-4 mb-10 max-w-xl mx-auto">
        Tell us about your daily habits so we can estimate your energy needs.
      </p>

      <div className="space-y-8">

        <div>
          

          <div className="max-w-2xl mx-auto">

  <h3 className="mb-4 text-sm uppercase tracking-[0.18em] font-semibold text-[#5a536e]">
    Activity Level
  </h3>

   <div className="space-y-5">

            {activityLevels.map((activity) => (

              <QuestionCard
                key={activity.value}
                title={activity.title}
                subtitle={activity.subtitle}
                selected={
                  lifestyle.activity_level === activity.value
                }
                onClick={() =>
                  updateField("activity_level", activity.value)
                }
              />

            ))}

          </div>
</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-18">

          <QuestionInput
            label="Meals per Day"
            type="number"
            value={lifestyle.meals_per_day}
            onChange={(e) =>
              updateField("meals_per_day", e.target.value)
            }
          />

          <QuestionInput
            label="Water Intake"
            type="number"
            value={lifestyle.water_intake}
            onChange={(e) =>
              updateField("water_intake", e.target.value)
            }
            suffix="liter"
          />

          <QuestionInput
            label="Sleep"
            type="number"
            value={lifestyle.sleep_hours}
            onChange={(e) =>
              updateField("sleep_hours", e.target.value)
            }
            suffix="h"
          />

        </div>

      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
      />

    </div>
  );
}

export default LifestyleSlide;