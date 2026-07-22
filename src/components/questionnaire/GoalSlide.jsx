import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

function GoalSlide({
  answers,
  setAnswers,
  onNext,
  onBack,
}) {
  
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
      subtitle: "Reduce body fat while maintaining muscle mass."
    },
    {
      value: "gain_muscle",
      title: "Build Muscle",
      subtitle: "Increase muscle mass with a calorie surplus."
    },
    {
      value: "maintain",
      title: "Maintain Weight",
      subtitle: "Keep your current weight while eating healthier."
    },
    {
      value: "health",
      title: "Improve Health",
      subtitle: "Focus on healthier eating habits."
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">
 <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
        Step 2 of 6
      </p>
      <h2
        className="text-4xl font-bold text-[#24163b] text-center"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        What is your goal?
      </h2>

      <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

      <p className="text-center text-[#8d87a1] mt-4 mb-10">
        Select the option that best describes your objective.
      </p>

      <div className="max-w-2xl mx-auto space-y-5">

        {goals.map((chooseGoal) => (

          <QuestionCard
            key={chooseGoal.value}
            title={chooseGoal.title}
            subtitle={chooseGoal.subtitle}
            selected={
              answers.goal.primary_goal === chooseGoal.value
            }
            onClick={() =>
              updateField("primary_goal", chooseGoal.value)
            }
          />

        ))}

      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
      />

    </div>
  );
}

export default GoalSlide;