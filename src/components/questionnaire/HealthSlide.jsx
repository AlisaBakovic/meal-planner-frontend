import QuestionTextarea from "./QuestionTextarea";
import NavigationButtons from "./NavigationButtons";

function HealthSlide({
    answers,
    setAnswers,
    onNext,
    onBack
}){
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
<div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 md:p-14">

    <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] text-center">
    Step 4 of 6
    </p>

    <h2
    className="text-4xl md:text-5xl font-bold text-[#24163b] text-center mt-4"
    style={{ fontFamily: "Plus Jakarta Sans" }}
    >
        Your Health Information
    </h2>
    <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-5 mb-8" />

    <p className="text-[#8d87a1] text-center mt-4 mb-10 max-w-xl mx-auto">
        Share any health information that may help your trainer create a safer and more personalized nutrition plan.
    </p>

    <p className="text-sm text-[#a19ab8] text-center mt-4 mb-10">
        All information is confidential and will only be visible to your assigned trainer.
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



    <NavigationButtons
    onBack={onBack}
    onNext={onNext}
    />

</div>
  );
}
export default HealthSlide
