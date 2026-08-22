import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

function GoalSlide({ answers, setAnswers, onNext, onBack }) {
  const goal = answers.goal;

  const updateField = (field, value) => {
    setAnswers({
      ...answers,
      goal: {
        ...goal,
        [field]: value,
      },
    });
  };

  const goals = [
    {
      value: "lose_weight",
      title: "Lose Weight",
      subtitle: "Reduce body fat while maintaining muscle mass.",
    },
    {
      value: "gain_muscle",
      title: "Build Muscle",
      subtitle: "Increase muscle mass with a calorie surplus.",
    },
    {
      value: "maintain",
      title: "Maintain Weight",
      subtitle: "Keep your current weight while eating healthier.",
    },
    {
      value: "health",
      title: "Improve Health",
      subtitle: "Focus on healthier eating habits.",
    },
  ];

  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
      <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
        Step 2 of 6
      </p>
      <h2
        className="text-center text-4xl font-bold text-[#24163b]"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        What is your goal?
      </h2>

      <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

      <p className="mt-4 mb-10 text-center text-[#8d87a1]">
        Select the option that best describes your objective.
      </p>

      <div className="mx-auto max-w-2xl space-y-5">
        {goals.map((chooseGoal) => (
          <QuestionCard
            key={chooseGoal.value}
            title={chooseGoal.title}
            subtitle={chooseGoal.subtitle}
            selected={answers.goal.primary_goal === chooseGoal.value}
            onClick={() => updateField("primary_goal", chooseGoal.value)}
          />
        ))}
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

export default GoalSlide;
