import QuestionInput from "./QuestionInput";
import QuestionRadio from "./QuestionRadio";
import NavigationButtons from "./NavigationButtons";

function BasicInfoSlide({ answers, setAnswers, onNext, onBack }) {
  const basic = answers.basic_info;

  const updateField = (field, value) => {
    setAnswers({
      ...answers,
      basic_info: {
        ...basic,
        [field]: value,
      },
    });
  };

  return (
    <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
      <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
        Step 1 of 6
      </p>

      <h2
        className="mt-4 text-center text-4xl font-bold text-[#24163b] md:text-5xl"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Tell us about yourself
      </h2>

      <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

      <p className="mx-auto mt-4 max-w-xl text-center text-[#8d87a1]">
        These details help us create a nutrition plan tailored to your body and
        goals.
      </p>

      <div className="mt-12 space-y-8">
        <QuestionInput
          label="Age"
          type="number"
          placeholder="Enter your age"
          value={basic.age}
          onChange={(e) => updateField("age", e.target.value)}
        />

        <QuestionRadio
          label="Gender"
          options={["Male", "Female", "Other"]}
          value={basic.gender}
          onChange={(value) => updateField("gender", value)}
        />

        <QuestionInput
          label="Height"
          type="number"
          placeholder="Height"
          value={basic.height}
          onChange={(e) => updateField("height", e.target.value)}
          suffix="cm"
        />

        <QuestionInput
          label="Current Weight"
          type="number"
          placeholder="Current weight"
          value={basic.current_weight}
          onChange={(e) => updateField("current_weight", e.target.value)}
          suffix="kg"
        />

        <QuestionInput
          label="Target Weight"
          type="number"
          placeholder="Target weight"
          value={basic.target_weight}
          onChange={(e) => updateField("target_weight", e.target.value)}
          suffix="kg"
        />
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

export default BasicInfoSlide;
